export default function formatCheck() {
  const checkNumber = (input) => {
    const regex = /^[-+]?[0-9]*.?[0-9]+$/
    if (regex.test(input) || input === 'custom') {
      return true
    } else {
      return false
    }
  }
  const checkOxyClass = (input) => {
    //Must begin with hyphen, underscore or letter. Cannot contain '.' or be empty
    const regex = /^[a-zA-Z_-][a-zA-Z0-9_-]*$/g
    if (regex.test(input)) {
      return true
    } else {
      return false
    }
  }
  const checkOxyFolder = (input) => {
    //Must not be empty. Can't contain special caracters or spaces
    const regex = /^[a-zA-Z0-9]+$/g
    if (regex.test(input)) {
      return true
    } else {
      return false
    }
  }

  return {
    checkNumber,
    checkOxyClass,
    checkOxyFolder,
  }
}
