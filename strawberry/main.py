import uvicorn
from fastapi import FastAPI
from api.schema import graphql_app
from scripts.setup import initialize_cassandra_connection


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "OK"}


app.include_router(graphql_app, prefix="/graphql")

if __name__ == "__main__":
    initialize_cassandra_connection()
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
