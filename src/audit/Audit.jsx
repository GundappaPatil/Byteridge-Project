import {useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {format} from "date-fns"

import { userActions } from '_store';

export { Audit };

function Audit() {
    const users = useSelector(x => x.users.list);
    const [hr,setHr] = useState("24hr")
    const[page,setPage] = useState(1);
    const usersPerPage = 10;
    const data = users?.value;
    // console.log(data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    const lastUserOfPage = page * usersPerPage;
    const firstUserOfPage = lastUserOfPage - usersPerPage;
     const currentUsers = data?.slice(firstUserOfPage, lastUserOfPage);
     
     const handleChange = (e) => {
        setHr(e.target.value);
     }
    return (
        <div>
            <h1>Auditor Page</h1>
            <select name="dropdown" onChange={handleChange}>
                {/* <option value="">select</option> */}
                <option value="12hr">12hr</option>
                <option value="24hr">24hr</option>
            </select>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>First Name</th>
                        <th style={{ width: '30%' }}>Last Name</th>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '30%' }}>Login Date</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {currentUsers?.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{format(new Date(user.createdDate), hr === '12hr' ? 'dd/MM/yyyy h:mm:ss a' : 'dd/MM/yyyy HH:mm:ss')}</td>
                        </tr>
                    )}
                    {users?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={lastUserOfPage >= data?.length}
        >
          Next
        </button>
      </div>
        </div>
    );
}
