import { Select, Option, Button, Checkbox } from "@material-tailwind/react";
import Form from "./form";
import { useState } from "react";

export default function Page() {
    const [isFormAppear, setIsFormAppear] = useState(false);
    const [inputValue, setInputValue] = useState([]);
    const [filter, setFilter] = useState("All"); // State to keep track of the filter

    function handleInputValue(inputData) {
        setInputValue(prevValue => [...prevValue, inputData]);
    }

    function handleForm() {
        setIsFormAppear(!isFormAppear);
    }

    function handleDelete(index) {
        setInputValue(prevValue => prevValue.filter((_, i) => i !== index));
    }

    function handleCheckboxChange(index) {
        setInputValue(prevValue => {
            const newValue = prevValue.map((item, i) =>
                i === index
                    ? { ...item, status: item.status === "Complete" ? "Incomplete" : "Complete" }
                    : item
            );
            return newValue;
        });
    }

    function handleFilterChange(value) {
        setFilter(value);
    }

    // Filter items based on the selected filter
    const filteredItems = inputValue.filter(item => {
        if (filter === "All") return true;
        return item.status === filter;
    });

    console.log(inputValue);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-2">
            {isFormAppear && (
                <Form FormAppear={handleForm} inputValue={handleInputValue} />
            )}
            <div className={`w-full max-w-xl bg-white shadow-md rounded-lg ${isFormAppear ? 'blur-sm' : ''}`}>
                <h1 className="text-2xl font-bold m-4 text-gray-800 text-center">To-Do List</h1>
                <div className="flex mb-4 justify-between">
                    <Button
                        onClick={handleForm}
                        color="blue"
                        className="rounded-r-md ml-4"
                    >
                        Add
                    </Button>
                    <div className="mr-2">
                        <Select
                            label="Status"
                            className="border border-gray-300 rounded-md"
                            onChange={handleFilterChange} // Correctly pass the value to handleFilterChange
                            value={filter}
                        >
                            <Option value="All">All</Option>
                            <Option value="Incomplete">Incomplete</Option>
                            <Option value="Complete">Complete</Option>
                        </Select>
                    </div>
                </div>
                <ul className="space-y-2">
                    {filteredItems.map((item, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    className="mr-2"
                                    checked={item.status === "Complete"}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <span className="text-gray-700">{item.title}</span>
                            </div>
                            <div className="flex space-x-2">
                                <Button color="yellow" className="text-white">Edit</Button>
                                <Button color="red" className="text-white" onClick={() => handleDelete(index)}>
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
