// controllers/application.controller.js
const Application = require('./model');

exports.createApplication = async (req, res) => {
    const { userEmail, job_title, coverLetter } = req.body;
    const resume = req.file ? req.file.path : '';

    const application = new Application({
        userEmail,
        job_title,
        coverLetter,
        resume
    });

    try {
        await application.save();
        res.status(201).json({ message: 'Application created successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error.message);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getApplicationById = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update Application
exports.updateApplication = async (req, res) => {
    const { id } = req.params;
    const { userEmail, job_title, coverLetter } = req.body;
    const resume = req.file ? req.file.path : '';

    try {
        const application = await Application.findByIdAndUpdate(
            id,
            { userEmail, job_title, coverLetter, resume, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteApplication = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findByIdAndDelete(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};