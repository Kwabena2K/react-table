import { useState, useEffect } from "react";
import {faker} from "@faker-js/faker";


const Table = () => {


 // Fake data for demonstration purposes
        const [headers, setHeaders] = useState([
            { id: 1, KEY: "FullName", LABEL: "Full Name" },
            { id: 2, KEY: "Email", LABEL: "Email" },
            { id: 3, KEY: "City", LABEL: "City" },
            { id: 4, KEY: "registeredDate", LABEL: "Registered Date" },
            { id: 5, KEY: "daysSinceRegistered", LABEL: "Days Since Registered" },
        ]);

        const data = [
            {
            id: 1,
            FirstName: "John",
            LastName: "Doe",
            Email: "john.doe@example.com",
            City: "New York",
            registeredDate: "2023-01-01",
            },
            {
            id: 2,
            FirstName: "Mark",
            LastName: "Smith",
            Email: "mark.smith@example.com",
            City: "Los Angeles",
            registeredDate: "2023-01-02",
            },
            {
            id: 3,
            FirstName: "Denis",
            LastName: "Ortiz",
            Email: "denis.ortiz@example.com",
            City: "Chicago",
            registeredDate: "2023-01-01",
            },
            {
            id: 4,
            FirstName: "Jane",
            LastName: "Smith",
            Email: "jane.smith@example.com",
            City: "Houston",
            registeredDate: "2023-01-02",
            },
        ].map((item) => {
            const daysSinceRegistered = Math.floor(
            (new Date() - new Date(item.registeredDate)) / (1000 * 60 * 60 * 24)
            );
            return {
            ...item,
            FullName: `${item.FirstName} ${item.LastName}`,
            daysSinceRegistered,
            };
        });

        return (
            <table>
            <thead>
                <tr>
                {headers.map((header) => (
                    <th key={header.id}>{header.LABEL}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                <tr key={row.id}>
                    {headers.map((header) => (
                    <td key={header.id}>{row[header.KEY]}</td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        );
        };

        export default Table;


        