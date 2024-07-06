import { useEffect, useState } from 'react';
import './App.css';
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, doc, deleteDoc } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: ,
  authDomain: ,
  projectId:,
});
const db = getFirestore(firebaseApp);

export const App = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  

  const userCollection = collection(db, "users");

  const criarCadastro = async () => {
    await addDoc(userCollection, { nome, email });
      setNome("");
      setEmail("");
   
  };


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollection);
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  async function deleteUser(id){
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder='Nome...'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder='Email...'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={criarCadastro}>Criar User</button>
      <h1>Users List</h1>
      <ul>
        {users.map(user => {
          return(
          <div key={user.id}>
          <li>
            {user.nome} - {user.email} </li>
            <button onClick={()=> deleteUser(user.id)}>Deletar</button>
         
          </div>
          );
        })}
      </ul>
    </div>
  );
};
