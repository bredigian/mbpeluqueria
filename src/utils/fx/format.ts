export const formatName = (name: string) => {
  const nameSplitted = name?.toLowerCase().split(" ")
  const firstName = nameSplitted[0]
  const lastName = nameSplitted[1]
  if (!lastName) return null

  const firstNameCapitalized =
    firstName.charAt(0).toUpperCase() + firstName.slice(1)

  const lastNameCapitalized =
    lastName.charAt(0).toUpperCase() + lastName.slice(1)

  const parsedName = `${firstNameCapitalized} ${lastNameCapitalized}`

  return parsedName
}
