import React from 'react';

export function checkboxFormatter(isChecked) {
  return isChecked ? <span className="glyphicon glyphicon-ok"></span>
    : <span></span>;
}

export function checkboxToTextFormatter(b) {
  return b ? 'Igen' : 'Nem';
}
