import json

user_data = [
    {
        "user_id": 0,
        "name":"mattyC",
        "pass": "inTheStu",
        "grade/skill_level": 10,
        "certificate_hashes": ["bin","boon","baked"],
        "user_interactions": [0,0,0,0,0,0,0,1],
    },
    {
        "user_id": 1,
        "name":"mattyB",
        "pass": "inTheShu",
        "grade/skill_level": 12,
        "certificate_hashes": ["cin","coon","baked"],
        "user_interactions": [0,0,0,0,1,0,0,1],
    },
    # Add more users...
]


# Save the user data to a JSON file
with open('user_data.json', 'w') as json_file:
    json.dump(user_data, json_file, indent=2)

print("JSON file created: user_data.json")
