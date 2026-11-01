Welcome to the future of home automation! Your mission is to build a backend system acting as the central hub for managing IoT devices in a smart home environment. These IoT devices might include anything from smart lights to thermostats or security cameras. Your task is to create a RESTful web API that allows users to manage these devices, monitor their status, and control them remotely.
This task is designed to test your ability to design and implement a backend system with a focus on RESTful APIs, managing state, handling real-time data in an IoT context, and demonstrating how this system may be deployed.

Objectives:
Create IoT Device Management API:
    Register a New Device:
        Create an endpoint to register a new IoT device. The API should accept the necessary details to uniquely identify and describe the device.
        The response should return the details of the registered device, including a unique identifier.
    List All Devices:
        Implement an endpoint to retrieve a list of all registered devices. This endpoint should return a summary of each device's details.
    Get Device Details:
        Create an endpoint to retrieve the details of a specific device by its unique identifier.
    Update Device Status:
        Provide an endpoint to update the status or configuration of a specific device. This could be used, for example, to turn a light on or off, adjust a thermostat, etc.
        The response should confirm the updated status or configuration.
    Delete a Device:
        Implement an endpoint to delete a specific device from the system. The response should confirm the deletion.
        
Requirements:
• Use any backend technology stack you are comfortable with (e.g., Node.js, Python, Ruby, etc.).
• Use any form of data storage (in-memory database, relational database, file storage, etc.) to manage device state and history.
• Write clean, maintainable code with appropriate documentation and QA.
• Include error handling for common edge cases (e.g., invalid device IDs, bad input data).
• Add a front-end to display a list of IoT devices
• We do not necessarily discourage the use of AI, but you must be able to talk in depth about your decisions and technical implementation.

Deliverables:
A link to your public GitHub repository with the project code.
A README file with instructions on how to run the project, including any assumptions you made.
(Optional) A brief summary of your approach and any interesting challenges you encountered.