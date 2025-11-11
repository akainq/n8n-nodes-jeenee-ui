# n8n-nodes-jeenee-ui

This n8n node helps you build Telegram bot UI using Jeenee DSL (Domain Specific Language). It provides a visual interface to create interactive UI components for Telegram bots.

## Features

- **Visual UI Builder** - Create complex Telegram bot UI through n8n's GUI using Jeenee DSL
- **Full DSL Support** - All Jeenee DSL components available: buttons, selects, file uploads, rich choices, etc.
- **Type-Safe** - Built with TypeScript for reliability
- **Easy Integration** - Works seamlessly with Telegram bots powered by Jeenee

## Installation

### Community Node Installation

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install** and enter: `n8n-nodes-jeenee-ui`
4. Restart n8n

### Manual Installation

```bash
npm install n8n-nodes-jeenee-ui
```

## Supported Components

### Interactive Components

- **Buttons** - Create callback and URL buttons
- **Select Menu** - Single or multi-select dropdowns
- **Checkboxes** - Multiple checkboxes with confirm button
- **Text Input** - Prompt users to enter text
- **File Upload** - Allow single or multiple file uploads
- **Rich Choices** - Cards with rich content and buttons
- **Image Choices** - Choose from images with buttons

### Display Components

- **Note** - Display informational text
- **Progress** - Show processing indicators
- **Image** - Display images with captions

## Usage Example

### Simple Button Example

```json
{
  "session_id": "unique-session-123",
  "message": "Choose an action:",
  "update": "new",
  "components": [
    {
      "kind": "buttons",
      "items": [
        {
          "label": "Start",
          "custom_id": "btn:start"
        },
        {
          "label": "Help",
          "custom_id": "btn:help"
        }
      ]
    }
  ]
}
```

### File Upload Example

```json
{
  "session_id": "session-456",
  "message": "Upload your homework",
  "components": [
    {
      "kind": "file_upload",
      "custom_id": "upload_homework",
      "button_label": "📎 Upload Files",
      "multiple": true,
      "min_files": 1,
      "max_files": 5,
      "max_size_mb": 50
    }
  ]
}
```

### Select Menu Example

```json
{
  "session_id": "session-789",
  "message": "Select your course:",
  "components": [
    {
      "kind": "select",
      "custom_id": "course_select",
      "options": [
        {"label": "Math", "value": "math"},
        {"label": "Physics", "value": "physics"},
        {"label": "Chemistry", "value": "chemistry"}
      ]
    }
  ]
}
```

## Integration with Telegram Bot

This node is designed to work with a Telegram bot that understands the Jeenee DSL format. The bot should:

1. Receive the JSON output from this node via webhook
2. Parse the Jeenee DSL components
3. Render them as Telegram messages with inline keyboards
4. Handle user interactions (button clicks, file uploads, etc.)
5. Send results back to your n8n workflow

## Component Reference

### Buttons
- `kind: "buttons"`
- `items[]` - Array of button objects
  - `label` - Button text
  - `custom_id` - Callback data
  - `url` - Link URL (for URL buttons)
  - `emoji` - Optional emoji

### Select Menu
- `kind: "select"`
- `custom_id` - Unique identifier
- `options[]` - Array of options
  - `label` - Display text
  - `value` - Value to send
  - `description` - Optional description
- `max_values` - For multi-select (default: 1)
- `placeholder` - Placeholder text

### Text Input
- `kind: "text_edit"`
- `custom_id` - Unique identifier
- `title` - Input title
- `save_label` - Button text
- `placeholder` - Placeholder text
- `max_length` - Maximum characters

### File Upload
- `kind: "file_upload"`
- `custom_id` - Unique identifier
- `button_label` - Button text
- `multiple` - Allow multiple files (boolean)
- `min_files` - Minimum files required
- `max_files` - Maximum files allowed
- `max_size_mb` - File size limit in MB

### Rich Choices
- `kind: "rich_choices2"`
- `items[]` - Array of rich choice items
  - `custom_id` - Callback identifier
  - `label` - Button label
  - `emoji` - Optional emoji
  - `blocks[]` - Content blocks
    - `role` - Optional role/title
    - `content` - Text content

### Image Choices
- `kind: "image_choices"`
- `custom_id` - Unique identifier
- `items[]` - Array of image options
  - `image_url` - Image URL
  - `label` - Caption
  - `value` - Value to send

### Checkboxes
- `kind: "checkboxes"`
- `custom_id` - Unique identifier
- `options[]` - Array of checkbox options
  - `label` - Checkbox text
  - `value` - Value to send

### Note
- `kind: "note"`
- `text` - Text to display

### Progress
- `kind: "progress"`
- `text` - Progress message (default: "Processing...")

### Image
- `kind: "image"`
- `image_url` - Image URL
- `label` - Optional caption

## Resources

- [n8n Documentation](https://docs.n8n.io/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
