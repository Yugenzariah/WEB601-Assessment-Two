const NoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [
        {
            name: String,
            color: String // Use #fffff etc.
        }
    ],
    isArchived: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.mode('Note', NoteSchema);