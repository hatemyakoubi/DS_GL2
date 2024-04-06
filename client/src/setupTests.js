// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// Import Task model
const Task = require('../models/Task');


// Test case for PATCH endpoint
describe('PATCH /tasks/:taskId', () => {
    it('should update isCompleted field of a task to true', async () => {
        // Create a task in the database
        const task = await Task.create({ text: 'Test task', isCompleted: false });

        // Send PATCH request to update the task's isCompleted field
        const response = await request(app)
            .patch(`/tasks/${task._id}`)
            .send({ isCompleted: true });

        // Check if the response is successful
        expect(response.status).to.equal(200);

        // Check if the task's isCompleted field is updated in the database
        const updatedTask = await Task.findById(task._id);
        expect(updatedTask.isCompleted).to.be.true;
    });

    it('should return 404 if task is not found', async () => {
        // Send PATCH request with an invalid taskId
        const response = await request(app)
            .patch('/tasks/invalidTaskId')
            .send({ isCompleted: true });

        // Check if the response status is 404
        expect(response.status).to.equal(404);
    });

});