
"use client";



export const HamburgerIcon = () => {
  return (
    <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
  );
}

export const CloseIcon = () => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-black left-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
  );
}