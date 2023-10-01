import { ChangeEvent, useState } from 'react';

export function Header() {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('search-term') || '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    localStorage.setItem('search-term', value);
  };

  return (
    <div className="header card">
      <input className="input" type="text" defaultValue={searchTerm} onChange={handleInputChange} />
      <button className="search-button">Search</button>
    </div>
  );
}

// export function Header() {
//   const savedSearchTerm = localStorage.getItem('search-term');

//   return (
//     <div className="header card">
//       <input
//         className="input"
//         type="text"
//         defaultValue={savedSearchTerm ? savedSearchTerm : ''}
//         onChange={(changeEvent) => {
//           localStorage.setItem('search-term', changeEvent.currentTarget.value);
//         }}
//       />
//       <button className="search-button">Search</button>
//     </div>
//   );
// }
