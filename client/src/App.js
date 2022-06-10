import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';


function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listofFriend, setListOfFriend] = useState([]);

  // ========== post data frontend to backend ==========
  const addFriend = () => {
    Axios.post('https://mern-project17.herokuapp.com/addfriend', {
      name: name,
      age: age,
    }).then((response) => {
      setListOfFriend([
        ...listofFriend,
        { _id: response.data._id, name: name, age: age },
      ]);
    });
  };

  // ======== update data ========
  const updateFriend = (id) => {
    const newName = prompt('Enter your name: ');
    const newAge = prompt('Enter your age: ');
    Axios.put('https://mern-project17.herokuapp.com/update', {
      newAge: newAge,
      id: id,
    }).then(() => {
      setListOfFriend(
        listofFriend.map((val) => {
          return val._id === id ? { _id: id, name: newName, age: newAge } : val;
        })
      );
    });
  };

  // ====== delete data individually =======
  const deleteFriend = (id) => {
    Axios.delete(`https://mern-project17.herokuapp.com/delete/${id}`).then(
      () => {
        setListOfFriend(
          listofFriend.filter((val) => {
            return val._id !== id;
          })
        );
      }
    );
  };

  // ====== data get from database=====

  useEffect(() => {
    Axios.get('https://mern-project17.herokuapp.com/read')
      .then((response) => {
        setListOfFriend(response.data);
        // console.log(listofFriend);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <label htmlFor="">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="">Age</label>
        <input
          type="number"
          placeholder="Enter your age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <button className="button" onClick={addFriend}>
          submit
        </button>
      </div>

      <div className="table">
        <tbody>
          <tr className="table-dark">
            {/* <th>id</th> */}
            <th>Name</th>
            <th>Age</th>
            <th></th>
          </tr>
          {listofFriend.map((data, id) => (
            <tr key={id}>
              {/* <td>{data._id}</td> */}
              <td>{data.name}</td>
              <td>{data.age}</td>
              <td>
                <button
                  onClick={() => {
                    updateFriend(data._id);
                  }}
                >
                  update
                </button>
                <button
                  onClick={() => {
                    deleteFriend(data._id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
}

export default App;
