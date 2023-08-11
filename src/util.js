const getInstructorText = (classObj) => {
  let instructorText = "";
  try {
    const instructorsArray = JSON.parse(classObj.instructorName.replace(/'/g, '"'));
    const instructorName = instructorsArray[0];
    const instructorNames = instructorName.split(" ");
    const lastName = instructorNames[instructorNames.length - 1];
    instructorText =
      instructorNames
        .slice(0, -1)
        .map((n) => n[0] + ". ")
        .join("") + lastName;
  } catch (error) {
    console.log(`error parsing ${classObj.instructorName}`);
  }

  return instructorText.toUpperCase();
};

module.exports = getInstructorText;
