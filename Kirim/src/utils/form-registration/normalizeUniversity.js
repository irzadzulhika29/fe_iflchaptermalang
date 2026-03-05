const ALIASES = {
  "ub": "Universitas Brawijaya",
  "unibraw": "Universitas Brawijaya",
  "brawijaya": "Universitas Brawijaya",
  "universitas brawijaya": "Universitas Brawijaya",

  "ui": "Universitas Indonesia",
  "universitas indonesia": "Universitas Indonesia",

  "ugm": "Universitas Gadjah Mada",
  "gadjah mada": "Universitas Gadjah Mada",
  "universitas gadjah mada": "Universitas Gadjah Mada",

  "itb": "Institut Teknologi Bandung",
  "institut teknologi bandung": "Institut Teknologi Bandung",

  "its": "Institut Teknologi Sepuluh Nopember",
  "institut teknologi sepuluh nopember": "Institut Teknologi Sepuluh Nopember",

  "unair": "Universitas Airlangga",
  "universitas airlangga": "Universitas Airlangga",

  "unpad": "Universitas Padjadjaran",
  "universitas padjadjaran": "Universitas Padjadjaran",

  "binus": "Bina Nusantara",
  "universitas bina nusantara": "Bina Nusantara",

  "telkom": "Telkom University",
  "telkom university": "Telkom University",

  "upn veteran jawa timur": "UPN Veteran Jawa Timur",
  "upn jatim": "UPN Veteran Jawa Timur",
  "upn": "UPN Veteran Jawa Timur",

};

const cleanup = (s) =>
  s.toLowerCase()
   .replace(/\./g, " ")
   .replace(/\s+/g, " ")
   .trim();

const titleCaseAll = (s) =>
  s
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

export function normalizeUniversity(input) {
  if (!input) return "";

  const raw = String(input).trim();
  const key = cleanup(raw);

  if (ALIASES[key]) return ALIASES[key];

  let val = key.startsWith("univ ") ? key.replace(/^univ\s+/, "universitas ") : key;

  if (val.startsWith("universitas ")) {
    const name = val.replace(/^universitas\s+/, "");
    return `Universitas ${titleCaseAll(name)}`;
  }

  return titleCaseAll(raw);
}
