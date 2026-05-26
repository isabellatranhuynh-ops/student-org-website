# Student Organization Website

A fully-functional website for student organizations with admin dashboard for content management.

## Features
- 🎨 Admin Dashboard: Manage content, images, announcements
- 🌐 Public Pages: Home, About, Meet the Team, Resources, Student Survey, Application Form
- 📷 Image Upload: Upload and manage images before publishing
- 📢 Announcements/Pinboard: Create and manage announcements
- 👥 Team Management: Add team members and display them
- 📋 Forms: Application form for level-up to VITAL Senior/Senior
- 💾 Local Storage: All data persists in browser

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript
- No external dependencies (runs anywhere)
- Responsive design
- Browser Local Storage for data persistence

## Getting Started

1. Clone this repository
   ```bash
   git clone https://github.com/isabellatranhuynh-ops/student-org-website.git
   cd student-org-website
   ```

2. Open `index.html` in your browser
   - Simply open the file locally or serve it on a web server

3. Access the admin panel at `admin.html`
   - Login with default credentials (see below)
   - Upload images and manage content
   - Publish to your hosting

## Default Login Credentials

**⚠️ IMPORTANT: Change these immediately before deploying!**

- **Username**: `admin`
- **Password**: `admin123`

To change credentials:
1. Open `js/storage.js`
2. Find the `checkAuth()` function
3. Update the username and password

## File Structure

```
student-org-website/
├── index.html              # Public homepage
├── admin.html              # Admin dashboard
├── about.html              # About/Who Are We page
├── team.html               # Meet Our Team page
├── survey.html             # Student Survey page
├── resources.html          # Resources page
├── application.html        # Application Form (level-up)
├── README.md               # This file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── admin.js            # Admin dashboard logic
│   ├── storage.js          # Local storage management
│   └── app.js              # Main app logic
└── images/                 # Uploaded images (created dynamically)
```

## Pages Overview

### Public Pages

#### Home (`index.html`)
- Hero section with organization title and description
- Announcements/pinboard section
- Featured cards highlighting what the org offers

#### About Us (`about.html`)
- Who Are We section
- Mission statement
- Organization values

#### Meet Our Team (`team.html`)
- Display all team members
- Shows member name, role, rank (Member/Senior/VITAL Senior/Leadership)
- Member photos and bio

#### Student Survey (`survey.html`)
- Dynamic survey questions
- Support for:
  - Text responses
  - Multiple choice questions
  - Rating scales (1-5)
- Export responses to CSV

#### Resources (`resources.html`)
- Links to helpful materials
- Resource descriptions
- External resource links

#### Leadership Application (`application.html`)
- Form for members to apply for leadership roles
- Asks about:
  - Duration as member
  - Contributions to the team
  - Motivation for leadership
  - Leadership style
  - Choice of role (VITAL Senior or Senior)
- Applications stored for admin review

### Admin Dashboard (`admin.html`)

#### Content Tab
- Edit hero section (title & description)
- Edit About page sections (Who Are We, Mission, Values)

#### Team Tab
- Add new team members
- Set role, rank, and bio
- Assign profile images
- Delete members

#### Announcements Tab
- Post announcements/pinboard items
- View all announcements
- Delete announcements

#### Survey Tab
- Create survey questions
- Support multiple question types
- View survey responses
- Export responses to CSV file

#### Resources Tab
- Add new resources
- Edit resource titles, descriptions, links
- Delete resources

#### Applications Tab
- View all leadership applications
- Approve or reject applications
- View application details and member information

#### Images Tab
- Upload images (converted to data URLs)
- Copy image URLs to clipboard
- Use images in team member profiles and content
- Delete unused images

## How to Use

### For Site Visitors
1. Visit the public pages to learn about your organization
2. Fill out the survey to provide feedback
3. Browse team members and resources
4. Submit leadership application if eligible

### For Organization Leaders (Admin)
1. Go to `admin.html`
2. Login with admin credentials
3. Upload images for team members
4. Add and manage team members with their information
5. Post announcements and updates
6. Create and manage survey questions
7. Review and approve/reject leadership applications
8. Manage resources and links

## Data Persistence

All data is stored in the browser's Local Storage:
- Content changes are saved immediately
- Data persists even after closing the browser
- **Important**: Data is stored locally per browser (not synced across devices)
- To backup data, export survey responses or screenshot important information

## Customization

### Change Colors
Edit `css/styles.css` and modify the `:root` CSS variables:
```css
:root {
    --primary-color: #6366f1;      /* Change primary color */
    --secondary-color: #ec4899;    /* Change accent color */
    --text-color: #1f2937;         /* Change text color */
}
```

### Add Your Logo
Update the `.logo` in `css/styles.css` and the navbar HTML in each page.

### Change Organization Name
Find and replace "Student Org" throughout the HTML files.

## Deployment to Wasmer

1. Ensure all files are in your repository
2. Deploy to Wasmer:
   ```bash
   wasmer deploy
   ```
3. Or upload the files to your Wasmer hosting

## Security Notes

⚠️ **Before deploying:**
1. Change default admin credentials
2. Consider adding a backend for sensitive data
3. Enable HTTPS on your hosting
4. Regularly backup important data

## Troubleshooting

**Images not showing?**
- Make sure you're uploading images from the Images tab
- Copy the image URL and paste it in the team member form

**Data disappeared?**
- Browser Local Storage has limited capacity (~5-10MB)
- Clear browser cache can remove data
- Use export feature to backup survey responses

**Login not working?**
- Check browser console for errors
- Make sure cookies/localStorage are enabled
- Try in a different browser

## Support & Feedback

For issues or improvements, create an issue in the repository.

## License

Free to use and modify for your student organization.
