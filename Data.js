
"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash,faTruckFast } from "@fortawesome/free-solid-svg-icons";

// เปลี่ยนตรงนี้
function RetrieveData({ data, index, onEdit, onDelete }) {
    return (
        <tr>
            <td className="py-2 px-4">{index + 1}</td>   
            <td className="py-2 px-4">{data.Age}</td>
            <td className="py-2 px-4">{data.Gender}</td>
            <td className="py-2 px-4">{data.Occupation}</td>
            <td className="py-2 px-4">{data["Educational Qualifications"]}</td>
            <td className="py-2 px-4">{data["Family size"]}</td>
            <td className="py-2 px-4">{data.Output}</td>
            <td className="py-2 px-4">
                <button
                    onClick={() => onEdit(data)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>

                <button
                    onClick={() => onDelete(data)}
                    className="text-red-500 hover:text-red-700 ml-2"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
}
// เปลี่ยนตรงนี้
export default function Delivery() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [selectedData, setSelectedData] = useState({
        Age: "",
        Gender: "",
        Occupation: "",
        ["Educational Qualifications"]: "",
        Feedback: "",
    });
    
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [isCreateModalOpen, setIsCreateModalOpen] = useState('');

const [currentPage, setCurrentPage] = useState(1);
const dataPerPage = 10;



// Calculate the current data to be shown on the current page
const indexOfLastData = currentPage * dataPerPage;
const indexOfFirstData = indexOfLastData - dataPerPage;
const currentData = (data || []).slice(indexOfFirstData, indexOfLastData);

// Calculate the total number of pages and limit it to a max of 10 pages
const totalPages = Math.ceil((data?.length || 0) / (dataPerPage || 1));
const displayedPages = Math.min(totalPages); // Limit to a max of 10 pages

const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

// Handle "Next" and "Previous" buttons
const handleNextPage = () => {
    if (currentPage < displayedPages) {
        setCurrentPage(currentPage + 1);
    }
};

const handlePreviousPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};

// เปลี่ยนตรงนี้ htpp เปลี่ยนเป็นชื่อตารางใน sql
    useEffect(() => {
        fetch("http://localhost:3001/itd_data_exam")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((Data) => {
                setData(
                    


                    
                );
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
// เปลี่ยนตรงนี้ htpp เปลี่ยนเป็นชื่อตารางใน sql
    useEffect(() => {
        setSearch(search.trim());
        if (search === "") {
            fetch("http://localhost:3001/itd_data_exam")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            fetch("http://localhost:3001/itd_data_exam/search/" + search, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [search]);

    const handleEditClick = (data) => {
        setSelectedData(data);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/itd_data_exam/update/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            });
        setIsEditModalOpen(false);
    };

    const handleDeleteClick = (data) => {
        setSelectedData(data);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/itd_data_exam/delete/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            });
        setIsDeleteModalOpen(false);
    };
// เปลี่ยนตรงนี้ (htpp เปลี่ยนเป็นชื่อตารางใน sql)
    const handleCreateClick = () => {
        setSelectedData({
            Age: "",
            Gender: "",
            Occupation: "",
            ["Educational Qualifications"]: "",
            ["Educational Qualifications"]: "",
            Feedback: "",
        });
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleSearch = () => {
        if (search.trim() === "") {
            fetch("http://localhost:3001/itd_data_exam")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            fetch("http://localhost:3001/itd_data_exam/search/" + search, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/itd_data_exam/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            });
        setIsCreateModalOpen(false);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 pt-8 mt-8">
                <div>Loading...</div>
            </div>
        );
    }
// เปลี่ยนตรงนี้ (htpp เปลี่ยนเป็นชื่อตารางใน sql) classname 
    return (
        <div className="container max-w-7xl mx-auto px-4 pt-8 mt-8 my-20 pb-20">
            <h1 className="text-3xl font-bold mb-4">Data</h1> 
            <div className="flex flex-row mb-4">
                <input
                    type="text"
                    className="w-96 border-2 border-teal-500 p-2 rounded-lg"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button 
                    onClick={handleSearch}
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg ml-2">
                    Search
                </button>

                <button
                    onClick={handleCreateClick}
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg ml-2 float-right"
                >
                    Add Data
                </button>
            </div>
            <table className="min-w-full bg-white table-auto border-b-4 border-teal-500 shadow-lg">
                <thead className="bg-teal-500 text-white text-left">
                    <tr>
                        <th className="py-2 px-4 border-b">No</th>
                        <th className="py-2 px-4 border-b">Age</th>
                        <th className="py-2 px-4 border-b">Gender</th>
                        <th className="py-2 px-4 border-b">Occupation</th>
                        <th className="py-2 px-4 border-b">Educational Qualifications</th>
                        <th className="py-2 px-4 border-b">Family Size</th>
                        <th className="py-2 px-4 border-b">Output</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((data, index) => (
                        <RetrieveData
                            key={index}
                            data={data}
                            index={indexOfFirstData + index}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center my-4"> 
    <button 
        onClick={() => setCurrentPage(1)} 
        disabled={currentPage === 1} 
        className={`mx-1 px-2 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200'}`}
    >
        First
    </button>
    <button 
        onClick={handlePreviousPage} 
        disabled={currentPage === 1} 
        className={`mx-1 px-2 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200'}`}
    >
        Previous
    </button>

    {/* แสดงเลขหน้า 1 ถึง 5 */}
    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
        const pageNumber = i + 1; // เลขหน้าจะเริ่มจาก 1
        return (
            <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`mx-1 px-2 py-1 rounded ${currentPage === pageNumber ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}
            >
                {pageNumber}
            </button>
        );
    })}

    <button 
        onClick={handleNextPage} 
        disabled={currentPage === totalPages} 
        className={`mx-1 px-2 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-200'}`}
    >
        Next
    </button>
    <button 
        onClick={() => setCurrentPage(totalPages)} 
        disabled={currentPage === totalPages} 
        className={`mx-1 px-2 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-200'}`}
    >
        Last
    </button>
</div>



            {/* Modals for Create, Edit, and Delete// เปลี่ยนตรงนี้ (htpp เปลี่ยนเป็นชื่อตารางใน sql) */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Edit Data</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Age"
                                >
                                    Age
                                </label>
                                <input
                                    type="number"
                                    id="Age"
                                    value={selectedData.Age}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            Age: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Gender"
                                >
                                    Gender
                                </label>
                                <input
                                    type="text"
                                    id="Gender"
                                    value={selectedData.Gender}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            Gender: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Occupation"
                                >
                                    Occupation
                                </label>
                                <input
                                    type="text"
                                    id="Occupation"
                                    value={selectedData.Occupation}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            Occupation: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Educational Qualifications"
                                >
                                    Educational Qualifications
                                </label>
                                <input
                                    type="text"
                                    id="Educational_Qualifications"
                                    value={selectedData["Educational Qualifications"]}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            ["Educational Qualifications"]: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Family size"
                                >
                                    Family Size
                                </label>
                                <input
                                    type="number"
                                    id="Family_Size"
                                    value={selectedData["Family size"]}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            ["Family size"]: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Feedback"
                                >
                                    Feedback
                                </label>
                                <textarea
                                    id="Feedback"
                                    value={selectedData.Feedback}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            Feedback: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseEditModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Delete Data</h2>
                        <p>Are you sure you want to delete this entry?</p>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                onClick={handleDeleteSubmit}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleCloseDeleteModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isCreateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Create Data</h2>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Age"
                                >
                                    Age
                                </label>
                                <input
                                    type="number"
                                    id="Age"
                                    value={selectedData.Age}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            Age: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Gender"
                                >
                                    Gender
                                </label>
                                <input
                                    type="text"
                                    id="Gender"
                                    value={selectedData.Gender}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            Gender: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Occupation"
                                >
                                    Occupation
                                </label>
                                <input
                                    type="text"
                                    id="Occupation"
                                    value={selectedData.Occupation}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            Occupation: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Educational_Qualifications"
                                >
                                    Educational Qualifications
                                </label>
                                <input
                                    type="text"
                                    id="Educational_Qualifications"
                                    value={selectedData["Educational Qualifications"]}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            ["Educational Qualifications"]: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Family_Size"
                                >
                                    Family Size
                                </label>
                                <input
                                    type="number"
                                    id="Family_Size"
                                    value={selectedData["Family size"]}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            ["Family size"]: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="Feedback"
                                >
                                    Feedback
                                </label>
                                <textarea
                                    id="Feedback"
                                    value={selectedData.Feedback}
                                    onChange={(e) =>
                                        setSelectedData({
                                            ...selectedData,
                                            Feedback: e.target.value,
                                        })
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseCreateModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}