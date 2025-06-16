    import { useState, useEffect, useRef } from "react";
    import { faker } from "@faker-js/faker";
    import Caret from "./Caret";

    const Table = () => {
    // hold data in table
    const [data, setData] = useState([]);

    // sort logic
    const [sortKey, setSortKey] = useState("FullName");
    const [sortOrder, setSortOrder] = useState("asc");

    // Faker library integration
    const fetchFakeUsers = async () => {
        return new Promise((resolve) => {
        setTimeout(() => {
            // fill array with 550 rows
            const users = Array.from({ length: 550 }, (_, id) => {
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
        });
        });
    };

    useEffect(() => {
        fetchFakeUsers().then((users) => {
        // link state with users fetched
        setData(users);
        });
    }, []);

    // sort logic START
    const sortTable = (key) => {
        if (sortKey === key) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
        setSortKey(key);
        setSortOrder("asc");
        }
    };

    const dataSorted = [...data].sort((a, b) => {
        if (!sortKey) return 0;
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    // sort logic END

    // Pagination logic START
    const [currentPage, setCurrentPage] = useState(1);
    const rowPage = 20;

    const pagination = dataSorted.slice(
        (currentPage - 1) * rowPage,
        currentPage * rowPage
    );

    // Pagination logic END

    // DSR column function to calculate date into String and return the value in days
    function daysSinceRegistered(dateString) {
        const today = new Date();
        const date = new Date(dateString);

        return Math.floor((today - date) / (1000 * 60 * 60 * 24));
    }



    // Column drag logic START

    // Click and drag to reorder columns
    const [columns, setColumns] = useState([
        "FullName",
        "Email",
        "City",
        "registeredDate",
        "DaysSinceRegistered",
    ]);
    
    const dragLabel = {
    FullName: "Full Name",
    Email: "Email",
    City: "City",
    registeredDate: "Registered Date",
    DaysSinceRegistered: "Days Since Registered",
    };

    const dragItem = useRef(null);

    const handleDragStart = (col) => {
        dragItem.current = col;
    };

    const handleDrop = (targetCol) => {
        const draggedCol = dragItem.current;
        if (draggedCol === targetCol) return;

        setColumns((prev) => {
        const newOrder = [...prev];
        const fromIndex = newOrder.indexOf(draggedCol);
        const toIndex = newOrder.indexOf(targetCol);

        newOrder.splice(fromIndex, 1);
        newOrder.splice(toIndex, 0, draggedCol);

        return newOrder;
        });

        dragItem.current = null;
    };




    // column Drag logic END


    // display table
    return (
        <>
        <table>
            <thead>
            <tr>
                {columns.map((col) => (
                <th
                    key={col}
                    draggable
                    onDragStart={() => handleDragStart(col)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(col)}
                    onClick={() => sortTable(col)}
                    style={{
                    cursor: "grab",
                    borderBottom: "2px solid #ccc",
                    backgroundColor: sortKey === col ? "#f0f8ff" : "white",
                    userSelect: "none",
                    }}
                >
                    {dragLabel[col]}{" "}
                    {sortKey === col && <Caret direction={sortOrder} />}
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {pagination.map((user) => (
                <tr key={user.id}>
                {columns.map((col) => (
                    <td key={col}>
                    {col === "DaysSinceRegistered"
                        ? daysSinceRegistered(user.registeredDate)
                        : user[col]}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>

        {/* Pagination scroll logic */}
        <div style={{ marginTop: "2rem" }}>
            <button
            // go to the prev page
            onClick={() => setCurrentPage(currentPage - 1)}
            // turn off button on page 1
            disabled={currentPage === 1}
            >
            Prev
            </button>

            <span style={{ margin: "0 1rem" }}>Page {currentPage}</span>

            {/* opposite logic of prev page */}
            <button
            onClick={() => setCurrentPage(currentPage + 1)}
            // disable button on last page
            disabled={currentPage >= Math.ceil(data.length / rowPage)}
            >
            Next
            </button>
        </div>
        </>
    );
    };

    export default Table;
