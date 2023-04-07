import unittest
from db.repositories import author_repository

class TestDatabase(unittest.IsolatedAsyncioTestCase):
    async def test_author_repository(self):
        res = await author_repository.create_author(
            name="John Mary",
            email="doe@test.com",
        )
        print(res)
        print("done")


# Run the tests
if __name__ == "__main__":
    unittest.main()
