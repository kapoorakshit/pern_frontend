import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateTask } from '../apiService/apiService';
import './AddTask.css';

interface UpdateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTaskUpdated: () => void; 
    taskData: {
        id: number;
        title: string;
        description: string;
        dueDate: string;
    } | null; 
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({ isOpen, onClose, onTaskUpdated, taskData }) => {
    // Define form validation schema using Yup
    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required')
            .min(3, 'Title must be at least 3 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(10, 'Description must be at least 10 characters'),
        dueDate: Yup.date()
            .required('Due Date is required')
            .nullable(),
    });

    // Use Formik for handling form state and validation
    const formik = useFormik({
        enableReinitialize: true, // Ensure formik re-initializes when taskData changes
        initialValues: {
            title: taskData ? taskData.title : '',
            description: taskData ? taskData.description : '',
            dueDate: taskData ? taskData.dueDate : '',
        },
        validationSchema,
        onSubmit: async (values) => {
            if (!taskData) return;

            try {
                const updatedAt = new Date().toISOString(); // Get current date and time
                await updateTask(taskData.id, values.title, values.description, values.dueDate);
                onTaskUpdated(); // Notify parent that a task was updated
                onClose(); // Close the modal
            } catch (error) {
                console.error('Failed to update task:', error);
            }
        },
    });

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update Task</h2>

                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.title && formik.errors.title ? 'error' : ''}
                        required
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="error-message">{formik.errors.title}</div>
                    ) : null}

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.description && formik.errors.description ? 'error' : ''}
                        required
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="error-message">{formik.errors.description}</div>
                    ) : null}

                    <input
                        type="datetime-local"
                        name="dueDate"
                        value={formik.values.dueDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.dueDate && formik.errors.dueDate ? 'error' : ''}
                        required
                    />
                    {formik.touched.dueDate && formik.errors.dueDate ? (
                        <div className="error-message">{formik.errors.dueDate}</div>
                    ) : null}

                    <button type="submit" className="save-task-button">
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTaskModal;
