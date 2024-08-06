import {
    Card,
    Input,
    Select,
    Option,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Form({ FormAppear, inputValue }) {
    const [inputData, setInputData] = useState({
        title: "",
        status: "Incomplete", // Default status
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInputData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSelectChange(value) {
        setInputData(prevData => ({
            ...prevData,
            status: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        inputValue(inputData);
        FormAppear();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <Card color="transparent" shadow={false} className="flex justify-center items-center">
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 p-4 shadow-2xl" onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Title
                        </Typography>
                        <Input
                            name="title"
                            value={inputData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-80"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <div className="w-80">
                            <Select
                                name="status"
                                label="Select Status"
                                value={inputData.status}
                                onChange={(value) => handleSelectChange(value)}
                            >
                                <Option value="Incomplete">Incomplete</Option>
                                <Option value="Complete">Complete</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-between mt-5 px-2">
                        <Button type="submit" color="blue">
                            Add
                        </Button>
                        <Button onClick={FormAppear} color="red">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
