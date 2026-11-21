WEB DEVELOPMENT INTERNSHIP - TASK 2
Personal portfolio website solution

START HERE
1. Download the repository ZIP or use the supplied ZIP, then extract it.
2. Open index.html in a modern web browser.
3. Edit the files in VS Code to add your details.
No installation, package manager, build command, or API key is required.

This package contains the website source and three working sample projects.
For the current deployment status and website URL, open the repository's
Settings > Pages. The steps below explain how to publish or redeploy a copy.

FILES
index.html                 Portfolio content and page structure
styles.css                 Layout, colors, responsive rules, and animations
script.js                  Portfolio interactions
assets/favicon.svg         Browser tab icon
projects/landing-page.html  Responsive sample studio landing page
projects/task-manager.html Interactive task list
projects/calculator.html   Calculator demo
projects/                  Supporting demo styles and scripts
README.txt                 This solution explanation and deployment guide
README.md                  Brief repository overview

HOW THE SOLUTION MEETS THE ASSIGNMENT
Hero: a name, developer tagline, introduction, and project navigation.
About: a short biography and a presentation of development skills.
Projects: three sample projects with links to their working local demos.
Contact: an email link. It opens the visitor's configured email application;
it does not send or store messages through a server.
CSS animations: hover transitions and scroll reveal effects, with support
for visitors who prefer reduced motion.
Responsive design: media queries adapt the layout and navigation to mobile.
Deployment: the plain HTML/CSS/JS files are ready for GitHub Pages.

PERSONALIZE BEFORE SHARING
The name and email are personalized. The biography remains sample content.
In index.html, update the page title, description, displayed name, tagline,
About text, and contact address. Change both the visible email text and the
mailto: link. Check the footer for a name placeholder as well.
Search the whole folder for placeholder text before publishing.
Keep sample project descriptions accurate, or replace them with your own
work, project links, screenshots, and descriptions.

HOW IT WORKS
Semantic HTML separates the navigation, main content, sections, and footer.
CSS controls the visual design, grid layouts, hover effects, and breakpoints.
JavaScript adds progressive interactions while keeping the page lightweight.
The task manager lets a visitor add, complete, filter, and remove tasks. It
uses browser-local storage when available; tasks are not shared between
devices. Some browsers restrict storage for local files or private sessions.
The calculator performs basic arithmetic without running text as JavaScript.
The studio landing page demonstrates a separate responsive page design.

DEPLOY TO GITHUB PAGES
1. Open the existing repository. To publish your own copy, create a public
   repository and initialize it with a README so that main exists.
2. Open the repository's Code tab. Choose Add file > Upload files.
3. Upload the CONTENTS of this extracted portfolio folder, retaining the
   assets and projects folders. index.html must sit at the repository root. Do not upload
   only the ZIP file, or nest everything inside an extra portfolio folder.
4. Commit the files to main. If GitHub requires a pull request, create it and
   merge it so that the files are present on main.
5. Open Settings > Pages. Under Build and deployment, choose Deploy from a
   branch. Select main and /(root), then Save.
6. Wait for deployment, then use Visit site in the Pages settings. Publishing
   can take up to 10 minutes. Copy the exact URL GitHub displays.
7. Open that URL on a phone and a computer. Check navigation, all three demo
   links, and the contact address. If deployment fails, inspect the Pages
   workflow in the repository's Actions tab.

OFFICIAL DEPLOYMENT REFERENCES
Publishing source and branch settings:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
Uploading files through the browser:
https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
Viewing the published site and deployment timing:
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
Documentation checked on 21 November 2026.

CHECKS COMPLETED
- Inspected the portfolio in a browser at desktop, 390px, and 320px widths.
- Tested the mobile menu opening and closing after navigation.
- Tested task creation, persistence after reload, completion, filtering,
  and clearing completed tasks.
- Tested calculator button and keyboard input, including 24 x 7 = 168 and
  8 / 2 = 4. Additional JavaScript checks covered errors and decimal input.
- Checked all 28 local file and anchor references across the four pages.
- Browser checks recorded no JavaScript errors.

BEFORE SUBMISSION
- Review the sample biography and verify the contact email.
- Read the HTML, CSS, and JavaScript so you can explain the implementation.
- Confirm the published GitHub Pages URL opens successfully.
- Test the mobile menu, project links, task list, and calculator.
- Submit the live website URL and repository URL as your internship requires.
Use the repository's Settings > Pages and Actions tabs to verify the current
deployment status. This project has not been submitted to the internship on
your behalf.
