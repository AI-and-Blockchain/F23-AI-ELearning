import numpy as np
from sklearn.neighbors import NearestNeighbors
import ipfshttpclient
import json 

print("hello world!")

# Sample course data 
course_data = [
    {
        "course_id": 0,
        "grade_level": 1,
        "subject": "Math",
        "course_name": "Mathematics 101",       # Course 1
        "course_difficulty": 8,
        "avg_rating": 6,
    },
    {
        "course_id": 1,
        "grade_level": 3,
        "subject": "Science",
        "course_name": "Science Explorers",      # Course 2
        "course_difficulty": 9,
        "avg_rating": 9,
    },
    {
        "course_id": 2,
        "grade_level": 6,
        "subject": "Art",
        "course_name": "Creative Arts Workshop",    # Course 3
        "course_difficulty": 5,
        "avg_rating": 2,
    },
    # Add more courses...Change to database to store e-learning courses
]

# Connect to Infura's IPFS service
api = ipfshttpclient.connect('/dns/ipfs.infura.io/https')

# Function to add course data as JSON files to IPFS
def add_course_to_ipfs(course_data):
    for course in course_data:
        file_data = json.dumps(course)  # Convert the course data to JSON string
        try:
            file_cid = api.add_bytes(file_data.encode('utf-8'))  # Add the JSON data to IPFS
            print(f"Course added to IPFS with CID: {file_cid['Hash']}")
        except ipfshttpclient.exceptions.ErrorResponse as e:
            print(f"Error adding course to IPFS: {e}")

# Example: Retrieve a file from IPFS
def retrieve_file_from_ipfs(file_cid):
    try:
        file_data = api.cat(file_cid)
        print(f"Retrieved file from IPFS: {file_data.decode('utf-8')}")
    except ipfshttpclient.exceptions.ErrorResponse as e:
        print(f"Error retrieving file from IPFS: {e}")

# Add course data to IPFS
add_course_to_ipfs(course_data)

# Replace 'your_file_CID' with the CID (Content Identifier) of the file you want to retrieve
retrieve_file_from_ipfs('your_file_CID')

"""
# User interactions history with courses (for this example, we assume binary interactions, e.g., taken or not taken)
interactions_history = np.array([
    [1, 0, 1],  # User 1 took Math and Art courses but not Science.
    [0, 1, 0],  # User 2 took Science.
    # Add more user interactions... Change to database to store all user interactions
])"""

# User's past interactions (e.g., binary values indicating whether the user has taken the course)
user_interactions = np.array([1, 0, 1])

# User's input (usually recieved through the body of the )
user_grade = 4
user_interests = ["Math", "Science"]

# Combine user input and interactions into a single feature vector
user_features = np.hstack((np.array([user_grade]), user_interactions))

# Extract features from course data
course_features = np.array([course["grade_level"] for course in course_data])  # Using grade level as a feature for simplicity.
"""course_features = np.array([
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 0]
])"""

# Initialize k-NN model
k = 3  # You can adjust the value of k.
knn = NearestNeighbors(n_neighbors=k, metric="euclidean")  # Euclidean distance metric for simplicity.

# Fit the model with course features
knn.fit(course_features.reshape(-1, 1))

# Query the k-NN model to find the most similar courses to the user's input
user_input = user_features.reshape(1, -1)
distances, indices = knn.kneighbors(user_input)

# Get recommended courses based on the most similar courses
recommended_courses = [course_data[i] for i in indices[0]]

# Print recommended courses
for course in recommended_courses:
    print(f"Recommended course for grade {course['grade_level']}: {course['course_name']}")
