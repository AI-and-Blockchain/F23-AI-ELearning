import sys
import json

address = sys.argv[1]

user_data = sys.argv[2]
user_data_object = json.loads(user_data)


# Save the user data to a JSON file
found = False
for key, value in user_data_object.items():
    for element in value:
        if (element['user_address'] == address):
            thisUser = element
            found = True 
            break
        else:
            continue
print(found)

if found == False:
    newUser = {
        "user_address": address,
        "name": "testA",
        "pass": "inTheStu",
        "grade/skill_level": 0,
        "certificate_hashes": ["bin", "boon", "baked"],
        "user_interactions": [0, 0, 0, 0, 0, 0, 0, 0]
    }
    with open('/Users/matthew/Documents/F23_AI_ELearning/server/knn_recommendations/user_data.json', 'w+', encoding='utf-8') as file:
        file.seek(0)  # Move the cursor to the beginning of the file
        user_data_object['userData'].append(newUser)
        print(user_data_object)
        json.dump(user_data_object, file)


