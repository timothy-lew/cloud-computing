class Summary:
    def __init__(self):
        self.type = "string"
        # self.description = "A summary of the relevance and usage of the files."
        self.description = "A summary of the query word."

    def to_dict(self):
        return {
            "type": self.type,
            "description": self.description
        }

class File:
    def __init__(self):
        self.type = "object"
        self.properties = {
            "name": {"type": "string"},
            "full_name": {"type": "string"},
            "private": {"type": "boolean"},
            "description": {"type": "string"},
            "score": {"type": "number"},
            "html_url": {"type": "string"},
            "repository_summary": {"type": "string", "description": "A summary of this specific file's relevance and usage"}
        }

    def to_dict(self):
        return {
            "type": self.type,
            "properties": self.properties
        }

class Files:
    def __init__(self):
        self.type = "array"
        self.items = File()

    def to_dict(self):
        return {
            "type": self.type,
            "items": self.items.to_dict()
        }

class GitHubRepoSummary:
    def __init__(self):
        self.name = "github_code_summary"
        self.schema = {
            "type": "object",
            "properties": {
                "summary": Summary().to_dict(),
                "files": Files().to_dict()
            }
        }

    def to_json(self):
        return {
            "type": "json_schema",
            "json_schema": {
                "name": self.name,
                "schema": self.schema
            }
        }

# Instantiate and generate the schema
schema = GitHubRepoSummary()

# Convert to JSON format (as a dictionary)
response_format = schema.to_json()
