import './style.css'
import { AppState } from './helpers.ts'
import { Calculateage } from './helpers.ts'

// Define User interface
const appState = new AppState();

appState.setState({
  name: 'John Doe',
  age: 30,
});

appState.setState({
  name: 'Jane Doe',
  age: 40,
});

console.log(appState.getState());

interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

// Function to fetch random users
async function fetchUsers(): Promise<User[]> {
  // use Promise<void> if method has no return

  try {
    const response = await fetch('https://randomuser.me/api/?results=9');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// Function to render users
async function renderUsers(): Promise<void> {
  const users = await fetchUsers();
  const app = document.querySelector<HTMLDivElement>('#app')!;
  
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold text-center mb-10 text-gray-800">Random Users</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${users.map(user => `
            <div class="backdrop-blur-lg bg-white/30 rounded-2xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div class="flex items-center space-x-4">
                <img src="${user.picture.large}" alt="${user.name.first}" class="w-20 h-20 rounded-full border-2 border-white/50">
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">${user.name.first} ${user.name.last}</h2>
                </div>
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">${Calculateage.run(user.dob.date)}</h2>
                </div>
              </div>
              <div class="mt-4 space-y-2">
                <p class="text-gray-700"><span class="font-medium">Location:</span> ${user.location.city}, ${user.location.country}</p>
                <p class="text-gray-700"><span class="font-medium">Phone:</span> ${user.phone}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Initial render
renderUsers();