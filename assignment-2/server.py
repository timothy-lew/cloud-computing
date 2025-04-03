import httpx
import os
import uvicorn 
import json

from http import HTTPStatus
from fastapi import FastAPI, HTTPException
from pathlib import Path
from typing import Any 
from dotenv import load_dotenv
from openai import OpenAI
from code_schema import response_format as code_response_format
from repo_schema import response_format as repo_response_format

from fastapi.middleware.cors import CORSMiddleware

load_dotenv(override=True)

OPENAI_API_KEY = os.getenv('OPENAI_KEY')
GITHUB_HEADER_TOKEN = os.getenv('GITHUB_TOKEN')
MODEL = "gpt-4o-mini"

client = OpenAI(api_key=OPENAI_API_KEY)

# port 8000
app: FastAPI = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/ping", status_code=HTTPStatus.OK)
def pong():
    return "pong"

@app.get("/github/repo", status_code=HTTPStatus.OK)
async def github(query: str):
    url = f"https://api.github.com/search/repositories?q={query}&page=5&per_page=5&sort=score&order=desc"
    headers = {
        "Authorization": f"Bearer {GITHUB_HEADER_TOKEN}"
    }
    
    # Make the GET request asynchronously
    async with httpx.AsyncClient() as client2:
        response = await client2.get(url, headers=headers)
        if response.json().get("total_count", 0) == 0:
            raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="No items found")
    
    items = response.json().get("items", [])
    message_content = f"Here are some repositories from the GitHub repository API for the query: '{query}':\n"
        
    for item in items:
        message_content += f"---\n"
        message_content += f"Repository Name: {item['name']}\n"
        message_content += f"Repository Full Name: {item['full_name']}\n"
        message_content += f"Description: {item.get('description', 'No description available')}\n"
        message_content += f"Score: {item['score']}\n"
        message_content += f"HTML URL: {item['html_url']}\n"
        message_content += f"---\n"
    print("message_content", message_content)

    completion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "instructions": "You are an intelligent assistant that helps users understand code repositories.",
                    "content": f"{message_content}Please summarize the relevance and usage of these code repositories.",
                }
            ],
            response_format=repo_response_format,
        )
    print(completion)
    res = json.loads(completion.choices[0].message.content)
    return res 

@app.get("/github/code", status_code=HTTPStatus.OK)
async def github(query: str):
    url = f"https://api.github.com/search/code?q={query}&page=2&per_page=5&sort=score&order=desc"
    headers = {
        "Authorization": f"Bearer {GITHUB_HEADER_TOKEN}"
    }
    print(url)
    
    # Make the GET request asynchronously
    async with httpx.AsyncClient() as client2:
        response = await client2.get(url, headers=headers)
        if response.json().get("total_count", 0) == 0:
            raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="No items found")
        # return response.json()
    
    items = response.json().get("items", [])
    # print(items)
    # return items
    # return response.json()

    message_content = f"Here are some files from the GitHub search API for the query: '{query}':\n"
        
    for item in items:
        message_content += f"---\n"
        message_content += f"File Name: {item['name']}\n"
        message_content += f"Repository: {item['repository']['full_name']}\n"
        message_content += f"Description: {item['repository'].get('description', 'No description available')}\n"
        message_content += f"File Path: {item['path']}\n"
        message_content += f"Score: {item['score']}\n"
        message_content += f"HTML URL: {item['html_url']}\n"
        message_content += f"---\n"
    print("message_content", message_content)

    completion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "instructions": "You are an intelligent assistant that helps users understand code files.",
                    "content": f"{message_content}Please summarize the relevance and usage of these files.",
                }
            ],
            response_format=code_response_format,
        )
    print(completion)
    res = json.loads(completion.choices[0].message.content)
    return res    

if __name__ == "__main__":
    uvicorn.run('server:app',  host="0.0.0.0", reload=True)