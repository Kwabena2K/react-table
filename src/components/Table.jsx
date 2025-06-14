    import { useState, useEffect } from "react";
    import { faker } from "@faker-js/faker";

    const Table = () => {
    
    // hold data in table
    const [data, setData] = useState([]);



    // Faker library integration
    const fetchFakeUsers = async () => {
        return new Promise((resolve) => {
        setTimeout(() => {
            const users = Array.from({ length: 500 }, (_, id) => {
            // First and last generated from faker library
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            return {
                id,
                FirstName: firstName,
                LastName: lastName,
                // Full name combined
                FullName: `${firstName} ${lastName}`, 
                // Generate email, city and date within range
                Email: faker.internet.email({ firstName, lastName }),
                City: faker.location.city(),
                registeredDate: faker.date
                .between({ from: "2025-01-01", to: "2025-06-14" })
                .toISOString()
                .split("T")[0],
            };
            });
            resolve(users);
        },);
        });
    };

    useEffect(() => {
        fetchFakeUsers().then((users) => {
            // link state with users fetched
        setData(users); 
        });
    }, []);



    // display table 
    return (
        <table>
        <thead>
            <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Registered Date</th>
            </tr>
        </thead>
        <tbody>
            {data.map((user) => (
            <tr key={user.id}>
                <td>{user.FullName}</td>
                <td>{user.Email}</td>
                <td>{user.City}</td>
                <td>{user.registeredDate}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
    };

    export default Table;
