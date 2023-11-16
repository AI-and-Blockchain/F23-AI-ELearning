import json

# Sample course data
course_data = [
    {
        "course_id": 0,
        "grade_level": 1,
        "subject": "Math",
        "course_name": "Mathematics 101",
        "course_difficulty": 8,
        "avg_rating": 6,
    },
    {
        "course_id": 1,
        "grade_level": 3,
        "subject": "Science",
        "course_name": "Science Explorers",
        "course_difficulty": 9,
        "avg_rating": 9,
    },
    {
        "course_id": 2,
        "grade_level": 6,
        "subject": "Art",
        "course_name": "Creative Arts Workshop",
        "course_difficulty": 5,
        "avg_rating": 2,
    },
    # Add more courses...
]

# Save the course data to a JSON file
with open('course_data.json', 'w') as json_file:
    json.dump(course_data, json_file, indent=2)

print("JSON file created: course_data.json")
