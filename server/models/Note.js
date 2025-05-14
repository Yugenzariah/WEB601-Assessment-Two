const mongoose = require('mongoose');

// Note model schema. Stores user notes including title, content, optional tags, and archive status.
const NoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
    title: { type: String, default: 'Untitled' },
    content: { type: String, default: '' },
    tags: [ // Array of tag objects containing name and colour
        {
            name: String,
            color: String // Use #fffff etc.
        }
    ],
    isArchived: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Note', NoteSchema);