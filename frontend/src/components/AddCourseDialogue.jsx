import { Sparkles } from 'lucide-react'
import React, { useState } from 'react'

function AddCourseDialogue({ children }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        includeVideo: false,
        noOfChapter: 0,
        category: '',
        level: ''
    });

    const onGenerate = () => {
        console.log(formData);
    };

    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div onClick={() => document.getElementById('my_modal_5').showModal()}>
                {children}
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create new course using AI</h3>
                    <div className='flex flex-col gap-4 mt-3'>
                        <fieldset className="fieldset bg-base-200 w-xl border p-4">

                            {/* Name */}
                            <div>
                                <label className="label">Language name</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter language name"
                                    value={formData.name}
                                    onChange={(e) => onHandleInputChange('name', e.target.value)}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="label">Language Description (Optional)</label>
                                <textarea
                                    className="textarea w-[400px]"
                                    value={formData.description}
                                    onChange={(e) => onHandleInputChange('description', e.target.value)}
                                    placeholder="Language Description"
                                />
                            </div>

                            {/* Number of chapters */}
                            <div>
                                <label className="label">No. of Chapters</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={formData.noOfChapter}
                                    onChange={(e) => onHandleInputChange('noOfChapter', e.target.value)}
                                    placeholder="No. of Chapters"
                                />
                            </div>

                            {/* Include video */}
                            <div className='flex gap-4 mt-2 items-center'>
                                <label className="label">Include Video</label>
                                <input
                                    type="checkbox"
                                    checked={formData.includeVideo}
                                    className="toggle"
                                    onChange={(e) => onHandleInputChange('includeVideo', e.target.checked)}
                                />
                            </div>

                            {/* Difficulty level */}
                            <div>
                                <label className='label'>Difficulty Level</label>
                                <select
                                    value={formData.level}
                                    onChange={(e) => onHandleInputChange('level', e.target.value)}
                                    className="select"
                                >
                                    <option value="">Select difficulty</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Advance">Advance</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="label">Category</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.category}
                                    onChange={(e) => onHandleInputChange('category', e.target.value)}
                                    placeholder="Category (Separated by commas)"
                                />
                            </div>

                            {/* Generate button */}
                            <div className='mt-5'>
                                <button
                                    className="btn btn-soft btn-primary w-full"
                                    onClick={onGenerate}
                                >
                                    <Sparkles /> Generate Course
                                </button>
                            </div>

                        </fieldset>
                    </div>

                    {/* Close modal */}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-soft btn-primary w-xl">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default AddCourseDialogue
