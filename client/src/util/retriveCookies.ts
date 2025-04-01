function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null; // returns null if split() or pop() results in undefined
  }

  return null; // Returns null if cookie doesn't exist
}

export default getCookie;
