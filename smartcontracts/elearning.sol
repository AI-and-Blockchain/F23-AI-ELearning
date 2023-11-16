// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ELearning {

    struct Course {
        uint256 course_id;
        string course_data_hash;
    }


    mapping(uint256 => Course) public courses;                  // course_id to course
    mapping(address => string[]) public certificate_hashes;     // user to their certificate hashes
    mapping(address => uint256[]) public current_courses;       // user to their currect courses


    event Certificate_Awarded(address indexed user, string ipfs_hash);
    event Course_Created(uint256 course_id, string course_data_hash);


    // requires int, string, int
    // adds course on-chain and saves prerequisites on-chain
    // emits Course_Created event
    function create_course(uint256 _course_id, string memory _course_data_hash) public {
        courses[_course_id] = Course({
            course_id: _course_id,
            course_data_hash: _course_data_hash
        });

        emit Course_Created(_course_id, _course_data_hash);
    }


    // requires certificate_hash, this string value should be
    //  the same as the course_name variable of the course
    // adds certificate_hash to the db
    // emits Certificate_Awarded
    function award_certificate(string memory certificate_hash) public {
        certificate_hashes[msg.sender].push(certificate_hash);
        emit Certificate_Awarded(msg.sender, certificate_hash);
    }

    // returns the user's number of certificates
    function get_certificate_count() public view returns (uint256)
    { return certificate_hashes[msg.sender].length; }

    // returns certificate hashes for backend to grab from
    //  ifps to display to the user
    function get_certificate_hashes() public view returns (string[] memory)
    { return certificate_hashes[msg.sender]; }

    // returns a user's current course_ids
    function get_current_course_ids() public view returns (uint256[] memory)
    { return current_courses[msg.sender]; }


    // gets course_data_hash for ipfs by id
    function get_course_data_hash(uint256 course_id) public view returns (string memory)
    { return courses[course_id].course_data_hash; }
}





























    // event Enrolled(address indexed user, uint256 course_id); 
    // function get_current_courses() public view returns (Course[] memory)
    // {
    //     uint256[] memory current_course_ids = get_current_course_ids(msg.sender);
    //     Course[] memory user_courses;
        
    //     for ( uint256 i = 0; i < current_course_ids.length; i++ ) {
    //         user_courses.push(courses[current_course_ids[i]]);
    //     }

    //     return user_courses;
    // }

    // // requires course_id
    // // calls has_prerequisites
    // // enrolls user in class and
    // // emits Enrolled
    // function enroll(uint256 course_id) public
    // {
    //     // user must have prerequisites to enroll
    //     require(has_prerequisites(msg.sender, course_id), "Prerequisites not met."); // maybe make message more specific

    //     // enroll student
    //     current_courses[msg.sender].push(course_id);
    //     emit Enrolled(msg.sender, course_id);
    // }


    // // helper function to enroll
    // // requires user_id and course_id
    // // returns true or false whether a user has the required
    // //  prerequisites for a course
    // function has_prerequisites(address user_id, uint256 course_id) public view returns (bool)
    // {
    //     uint256[] memory prerequisites = courses[course_id].prerequisite_ids;
    //     for ( uint i = 0; i < prerequisites.length; i++ ) {
    //         if ( !has_prerequisite(user_id, prerequisites[i]) ) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }


    // // TLDR: same as has_prerequisites but for one prerequisite_id
    // // helper function to has_prerequisites
    // // requires user_id and course_id
    // // returns true or false whether a user has the required
    // //  prerequisite
    // function has_prerequisite(address user_id, uint256 course_id) public view returns (bool)
    // {
    //     for ( uint256 i = 0; i < certificate_hashes[user_id].length; i++ ) {
    //         if ( compare(certificate_hashes[user_id][i], courses[course_id].course_name) )
    //         {
    //             return true;
    //         }
    //     }
    //     return false;
    // }


    // // helper function to has_prerequisite
    // // requires two strings
    // // returns true or false after comparing two strings
    // function compare(string memory str1, string memory str2) public pure returns (bool) {
    //     return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    // }
// }












































//     event PrerequisitesMet(uint256 student_id, uint256 course_id);
//     event CourseCompleted(uint256 certificate_id, uint256 student_id, uint256 course_id, uint256 completion_date);

//     function addStudent(string memory _name) public {
//         uint256 student_id = student_count++;
//         address_to_s_id[msg.sender] = student_id;
//         students[student_id] = Student({
//             student_id: student_id,
//             name: _name,
//             completed_courses: new uint256[](0)
//         });
//     }

//     function addCourse(CourseData memory _course_data, uint256[] memory _prerequisites) public {
//         uint256 course_id = course_count++;
//         courses[course_id] = Course({
//             course_id: course_id,
//             course_data: _course_data,
//             prerequisites: _prerequisites
//         });
//     }

//     function checkPrerequisites(uint256 _student_id, uint256 _course_id) public view returns (bool) {
//         uint256[] storage studentcompleted_courses = students[_student_id].completed_courses;
//         uint256[] storage course_prerequisites = courses[_course_id].prerequisites;

//         for (uint256 i = 0; i < course_prerequisites.length; i++) {
//             bool has_prerequisite = false;
//             for (uint256 j = 0; j < studentcompleted_courses.length; j++) {
//                 if (course_prerequisites[i] == studentcompleted_courses[j]) {
//                     has_prerequisite = true;
//                     break;
//                 }
//             }

//             if (!has_prerequisite) {
//                 return false;
//             }
//         }

//         return true;
//     }

//     function completeCourse(uint256 _student_id, uint256 _course_id, uint256 _completion_date, uint256 _score) public {
//         require(checkPrerequisites(_student_id, _course_id), "Student does not have the required prerequisites for the course");

//         uint256 certificate_id = certificate_count++;
//         students[_student_id].completed_courses.push(_course_id);

//         certificate_hashes[certificate_id] = Certificate({
//             certificate_id: certificate_id,
//             student_id: _student_id,
//             course_id: _course_id,
//             completion_date: _completion_date,
//             score: _score
//         });

//         emit PrerequisitesMet(_student_id, _course_id);
//         emit CourseCompleted(certificate_id, _student_id, _course_id, _completion_date);
//     }
// }