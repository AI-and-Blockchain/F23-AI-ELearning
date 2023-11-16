import sys
import numpy as np
from sklearn.neighbors import NearestNeighbors



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
user_grade = sys.argv[1]
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
