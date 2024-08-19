import Users from './components/Users';
import UserFinder from './components/UserFinder';
import UsersContext from './store/users-context';
import ErrorBoundary from './components/ErrorBoundary';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];


function App() {
  const usersContext = {
    users: DUMMY_USERS
  }

  return (
    <div>
    {/*<Users />
*/}    
    <UsersContext.Provider value={usersContext}>  
    <ErrorBoundary>
    <UserFinder />
    </ErrorBoundary>
    </UsersContext.Provider>
</div>
  );
}
//This is not configured with vitejs so when we start the app we need to use "npm start" command after "npm install".
export default App;
