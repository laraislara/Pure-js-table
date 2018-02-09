const data = [
  {
    Name: 'Thor Walton',
    Position: 'Developer',
    Office: 'New York',
    Age: 61,
    StartDate: '2013/08/11',
    Salary: '$98540',
  },
  {
    name: 'Quinn Flynn',
    position: 'Support Lead',
    office: 'Edinburgh',
    age: 22,
    startDate: '2013/03/03',
    salary: '$342000',
  },
  {
    name: 'Jennifer Acosta',
    position: 'Junior Javascript Developer',
    office: 'Edinburgh',
    age: 43,
    startDate: '2013/02/01',
    salary: '$75650',
  },
  {
    name: 'Haley Kennedy',
    position: 'Senior Marketing Designer',
    office: 'London',
    age: 43,
    startDate: '2012/12/18',
    salary: '$313500',
  },
  {
    name: 'Brielle Williamson',
    position: 'Integration Specialist',
    office: 'New York',
    age: 61,
    startDate: '2012/12/02',
    salary: '$372000',
  },
  {
    name: 'Michael Silva',
    position: 'Marketing Designer',
    office: 'London',
    age: 66,
    startDate: '2012/11/27',
    salary: '$198500',
  },
  {
    name: 'Bradley Greer',
    position: 'Software Engineer',
    office: 'London',
    age: 41,
    startDate: '2012/10/13',
    salary: '$131000',
  },
  {
    name: 'Dai Rios',
    position: 'Personnel Lead',
    office: 'Edinburgh',
    age: 35,
    startDate: '2012/09/26',
    salary: '$217500',
  },
  {
    name: 'Herrod Chandler',
    position: 'Sales Assistant',
    office: 'San Francisco',
    age: 59,
    startDate: '2012/08/06',
    salary: '$137500',
  },
  {
    name: 'Zorita Serrano',
    position: 'SoftwareEngineer',
    office: 'San Francisco',
    age: 56,
    startDate: '2012/06/01',
    salary: '$115000',
  },
  {
    name: 'Watson Fahey',
    position: 'Support Lead',
    office: 'Kentucky',
    age: 41,
    startDate: '2005/03/28',
    salary: '$273000',
  },
  {
    name: 'Niko Sauer',
    position: 'Marketing Designer',
    office: 'Delaware',
    age: 32,
    startDate: '2006/06/10',
    salary: '$283000',
  },
  {
    name: 'Merlin Bosco',
    position: 'Junior Java Script Developer',
    office: 'Illinois',
    age: 49,
    startDate: '2001/02/27',
    salary: '$273000',
  },
  {
    name: 'Gavin Tillman',
    position: 'Marketing Designer',
    office: 'Ohio',
    age: 33,
    startDate: '1988/06/19',
    salary: '$940000',
  },
  {
    name: 'Ian Eichmann',
    position: 'Personnel Lead',
    office: 'New Mexico',
    age: 41,
    startDate: '1983/12/23',
    salary: '$397000',
  },
  {
    name: 'Dayna Block',
    position: 'Designer',
    office: 'Utah',
    age: 36,
    startDate: '1975/10/25',
    salary: '$1203000',
  },
  {
    name: 'Sylvia Ebert',
    position: 'Designer',
    office: 'Louisiana',
    age: 30,
    startDate: '2008/07/05',
    salary: '$104200',
  },
  {
    name: 'Margarita Altenwerth',
    position: 'Support Lead',
    office: 'Rhode Island',
    age: 49,
    startDate: '1993/08/14',
    salary: '$145000',
  },
  {
    name: 'Elvis Bradtke',
    position: 'Sales Assistant',
    office: 'Arizona',
    age: 45,
    startDate: '2004/08/08',
    salary: '$690000',
  },
  {
    name: 'Celia Leuschke',
    position: 'Marketing Designer',
    office: 'Missouri',
    age: 34,
    startDate: '1985/08/05',
    salary: '$678000',
  },
];

function addHeaders(table, keys) {
  let row = table.insertRow();
  for (let i = 0; i < keys.length; i++) {
    let cell = row.insertCell();
    cell.appendChild(document.createTextNode(keys[i]));
  }
}

let table = document.createElement('table');
for (let i = 0; i < data.length; i++) {
  let child = data[i];
  if (i === 0) {
    addHeaders(table, Object.keys(child));
  }
  let row = table.insertRow();
  Object.keys(child).forEach(function(k) {
    let cell = row.insertCell();
    cell.appendChild(document.createTextNode(child[k]));
  });
}

document.getElementById('container').appendChild(table);
