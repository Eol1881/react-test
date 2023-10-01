import { Component, ReactNode } from 'react';

export class Header extends Component {
  render(): ReactNode {
    const savedSearchTerm = localStorage.getItem('search-term');

    return (
      <div className="header card">
        <input
          className="input"
          type="text"
          defaultValue={savedSearchTerm ? savedSearchTerm : ''}
          onChange={(changeEvent) => {
            localStorage.setItem('search-term', changeEvent.currentTarget.value);
          }}
        />
        <button className="search-button">Search</button>
      </div>
    );
  }
}
