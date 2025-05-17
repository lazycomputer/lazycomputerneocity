// jshint maxerr:1000

/* 	-------------------------------------------------------------------------------------------------------------- 
	
	◤   ◥	SCRIBBLEMAKES - UNIVERSAL POST MAKER V1.0
	 SM/C	----------------------------------------
	◣   ◢	Last updated: 22nd October 2024
	
	More widgets, plugins, and themes at: https://scribblemakes.com/code
	
	--------------------------------------------------------------------------------------------------------------

	Welcome to the Universal Post Maker (UPMW)! This widget creates several elements that can be used to make 
	posts, comics, blogs, art galleries, and more. It comes with a wide selection of options to customise your
	posts to either imitate your existing blog or create a new style. To integrate into your website, save this 
	.js	file to your website's directory and follow the instructions listed below:
	
 	1)	Save the .js file to your website directory
	2)	Open the .html file that will use this widget and add the following code in the <body> section:
		<script src="URLPATHWAY/scWidget_UniversalPostMaker_script.js"></script>
	3) Save the .css file of your choosing to your website directory or make a new one
	4) In your .html file, add the following code in the <head> section:
		<link href="URLPATHWAY/scWidget_UniversalPostMaker_[STYLE CHOICE].css" rel="stylesheet" type="text/css"
		media="all">
	5) Replace 'URLPATHWAY' in both code lines with your website URL or the local pathway to it.
	
	You can read more about the widget at: https://scribblemakes.com/code#2024-09-30-scWidget_UniversalPostMaker
	
 	-------------------------------------------------------------------------------------------------------------- */

// --------------------------------------------------------------------------------------------------------------
// --------------------- EDIT THE VARIABLES BELOW TO CHANGE THE WIDGET'S UNIVERSAL SETTINGS ---------------------
// --------------------------------------------------------------------------------------------------------------
// All variables in this section can also be edited in the HTML script section, do not edit other variables this
//  way, as they're inaccessible outside of this script

// File and folder directory variables
let sc_upmw_txtFile_postList = 'scWidget_UniversalPostMaker_postList.txt'; // Pathway to the post list txt file
let sc_upmw_folder_postStorage = 'scWidget_UniversalPostMaker_postData/';   // Pathway to the post folder

// Class names for post display containers and tag-limits
let sc_upmw_containerClass_archive = 'sc_upmw_classArchive';      // Class used for archive displays
let sc_upmw_containerClass_gallery = 'sc_upmw_classGallery';      // Class used for gallery displays
let sc_upmw_containerClass_highlight = 'sc_upmw_classHighlight';  // Class used for highlight display
let sc_upmw_containerClass_fullPostMarker = 'sc_upmw_displayFormat_full'; // Class used for displays with full posts
let sc_upmw_containerClass_tagIncluder = 'sc_upmw_tagInc:';       // Use with tags to include tags in a display
                                                                  // E.G. "sc_upmw_tagInc:tag1;tag2;tag3"
let sc_upmw_containerClass_tagExcluder = 'sc_upmw_tagExc:';       // Use with tags to exclude tags in a display
                                                                  // E.G. "sc_upmw_tagExc:tag1;tag2;tag3"
let sc_upmw_containerClass_postsPerPage = 'sc_upmw_perPage:';     // Use with a number to set how many posts are shown at once
                                                                  // E.G. "sc_upmw_perPage:5"
let sc_upmw_containerClass_postDisplayFormat = 'sc_upmw_displayFormat:'; // Use with 'link', 'expand', and 'full'
                                                                  // E.G. "sc_upmw_displayFormat:link"
let sc_upmw_containerClass_postContainer = "sc_upmw_postContainer"; // Class used for post containers inside displays
let sc_upmw_containerClass_postEmptyContainer = "sc_upmw_postEmptyContainer"; // Class used for empty post containers
let sc_upmw_containerClass_searchContainer = "sc_upmw_searchContainer"; // Class used for search bars inside displays
let sc_upmw_containerClass_searchEmptyContainer = "sc_upmw_searchEmptyContainer"; // Class used for empty search containers
let sc_upmw_containerClass_searchOptionContainer = "sc_upmw_searchOptionContainer"; // Class used for checkbox container
let sc_upmw_containerClass_searchOptionCustom = "sc_upmw_searchOptionCustom"; // Class used for custom checkboxes
let sc_upmw_containerClass_sortContainer = "sc_upmw_sortContainer"; // Class used for sort dropdown container inside displays
let sc_upmw_containerClass_sortEmptyContainer = "sc_upmw_sortEmptyContainer"; // Class used for empty sort containers
let sc_upmw_containerClass_tagContainer = "sc_upmw_tagContainer"; // Class used for the tag container inside displays
let sc_upmw_containerClass_tagEmptyContainer = "sc_upmw_tagEmptyContainer"; // Class used for empty tag containers
let sc_upmw_containerClass_tagButtonIncluded = "sc_upmw_tagButton_included";  // Class used for included tag buttons
let sc_upmw_containerClass_tagButtonExcluded = "sc_upmw_tagButton_excluded";  // Class used for excluded tag buttons
let sc_upmw_containerClass_dateContainer = "sc_upmw_dateContainer"; // Class used for date search containers
let sc_upmw_containerClass_dateEmptyContainer = "sc_upmw_dateEmptyContainer"; // Class used for empty date containers
let sc_upmw_containerClass_navContainer = "sc_upmw_navContainer"; // Class used for 'next' and 'prev' buttons in displays
let sc_upmw_containerClass_navEmptyContainer = "sc_upmw_navEmptyContainer"; // Class used for empty nav containers
let sc_upmw_containerClass_navPageNumber = "sc_upmw_navPageNumber"; // Class used for the page numbers between << and >>
let sc_upmw_containerClass_navCurrentPage = "sc_upmw_navCurrentPage"; // Class used for the current page visible

// Time and date setup
let sc_upmw_timezone = 0;  // What your timezone is compared to UTC, for example: AEST is UTC+10
let sc_upmw_postTimeSetting_defaultYear = 2024; // Uses this year if no date is provided
let sc_upmw_postTimeSetting_defaultMonth = 1;   // Uses this month if no date is provided
let sc_upmw_postTimeSetting_defaultDay = 1;     // Uses this day if no date is provided
let sc_upmw_postTimeSetting_defaultHour = 0;    // Uses this hour if no date is provided (24hr time)
let sc_upmw_postTimeSetting_defaultMinute = 0;  // Uses this minute if no date is provided
let sc_upmw_postTimeSetting_linkDateFormat = "Posted DD/MM/YY";  // How the date is formatted on links to posts
let sc_upmw_postTimeSetting_postDateFormat = "Posted on MML DDTH, YYYY at HHS:MINXM";  // How the date is formatted on open posts
  // Date format below, leave variable empty to hide date
  /*  YY = Short year (87), YYYY = Long year (1987)
      MML = Long Month (January), MMS = Short Month (Jan), MMZ = Number Month with leading zero (01), MM = Number Month
      DDTH = Day with th (1st), DDN = Day name (Monday), DDS = Day name short (Mon), DDZ = Day number with leading zero (01), DD = Day number
      HHSZ = Hour in 12hr time with leading zero (01-12), HHS = Hour in 12hr time (1-12), HHZ = Hour in 24hr time with leading zero (00-23), HH = Hour in 24hr time
      MINZ = Minutes with leading zero (00), MIN = Minutes (0)
      XM = Am / Pm  */

// Display post settings
let sc_upmw_postDisplaySetting_titleSplitType = "camelCase";  // Determines how to display titles based on file names
                                                              // "camelCase" splits words based on capitalisation
                                                              // "underscore" splits words based on the _ character
                                                              // "none" does not split the title and displays as-is
let sc_upmw_postDisplaySetting_scheduling = true; // If true, hide / alter posts dated for the future
let sc_upmw_postDisplaySetting_scheduledHidden = true;  // If true, posts dated for the future are hidden
                                                        // If false, future posts are visible but inaccessible
let sc_upmw_postDisplaySetting_postFullscreenID = "sc_upmw_postFullscreen"; // What the fullscreen post ID is
let sc_upmw_postDisplaySetting_postFullscreen_redirectClass = "sc_upmw_postFullScreen_redirect";  // Redirected post class
let sc_upmw_postDisplaySetting_postFullscreen_scheduledClass = "sc_upmw_postFullScreen_scheduled";  // Scheduled post class
let sc_upmw_postDisplaySetting_postFullscreen_closeButtonText = "X";  // What text is in the close button
let sc_upmw_postDisplaySetting_postFullscreen_prevButtonText = "<";   // What text is in the previous button
let sc_upmw_postDisplaySetting_postFullscreen_nextButtonText = ">";   // What text is in the previous button

// Default post information
// These properties are used if a post doesn't supply the information
let sc_upmw_postDefaultActive = true; // If true, replaces missing values with defaults. If false, leaves values empty
let sc_upmw_postDefaultProperty_title = "Post Name Not Found";                                  // Title of Post
let sc_upmw_postDefaultProperty_datePostText = "Posted DDTH of MML, YYYY";                      // Post Date Format
let sc_upmw_postDefaultProperty_dateLinkText = "YYYY/MMZ/DDZ";                                  // Link Date Format
let sc_upmw_postDefaultProperty_author = window.location.href.split("//")[1].split(".")[0];     // Author Name
let sc_upmw_postDefaultProperty_tagList = ["post", "defaultPost"];                              // Post Categories
let sc_upmw_postDefaultProperty_desc = "Post summary";                                          // Link Description
let sc_upmw_postDefaultProperty_cont = "<p>This is where the content of your post will go</p>"; // Post Content
let sc_upmw_postDefaultProperty_titleImg = "scWidget_UniversalPostMaker_postData/default_title.png";                               // Main Image
let sc_upmw_postDefaultProperty_titleImgAlt = "Image Alt entered here";                         // Main Image ALT
let sc_upmw_postDefaultProperty_thumbImg = "scWidget_UniversalPostMaker_postData/default_thumbnail.png";                               // Thumbnail Image
let sc_upmw_postDefaultProperty_thumbImgAlt = "Thumbnail Alt entered here";                     // Thumbnail Image ALT
let sc_upmw_postDefaultProperty_links = "<a href='https://neocities.org'>Neocities</a>";        // Links to highlight
let sc_upmw_postDefaultProperty_comment = "";                                                   // Extra widget section
// To make image finding easier, these variables tell the script what the suffix is
let sc_upmw_postDefaultProperty_classAdd = [""];                                                // What classes to add
let sc_upmw_postDefaultProperty_redirect = "";                                                  // URL to link to when clicked on, leave blank to open the post normally
let sc_upmw_postAutoFinder_imageLookup = true;                  // Will only look for images automatically if true
let sc_upmw_postAutoFinder_titleImgSuffix = "_title.png";       // Looks for "POSTURL" + this variable
let sc_upmw_postAutoFinder_thumbImgSuffix = "_thumbnail.png";   // Looks for "POSTURL" + this variable
                                                                // e.g. "2024-PostName.txt" -> "2024-PostName_image.png"

// Display container structures for posts and links
  // How display containers show posts and the links to those posts. Put in order of when elements should appear
  // The 'all' variables will be used if display container specific variables are empty
  // Elements: title; datePost; dateLink; author; tags; description; content; titleImg; thumbImg; comments;
            // links; share;
let sc_upmw_displayStructure_allLink = "thumbImg;title;dateLink;author;tags;description";
let sc_upmw_displayStructure_allPostHeader = "title;datePost;author;tags;titleImg";
let sc_upmw_displayStructure_allPostBody = "content;comments";
let sc_upmw_displayStructure_allPostFooter = "links;share";
let sc_upmw_displayStructure_archiveLink = "title;dateLink;description";
let sc_upmw_displayStructure_galleryLink = "thumbImg;title;tags";
let sc_upmw_displayStructure_highlightLink = "thumbImg;title";
// Class names for display container posts
let sc_upmw_postClass_link = "sc_upmw_link";
let sc_upmw_postClass_post = "sc_upmw_post";
let sc_upmw_displayStructure_class_header = "sc_upmw_postHeader";
let sc_upmw_displayStructure_class_body = "sc_upmw_postBody";
let sc_upmw_displayStructure_class_footer = "sc_upmw_postFooter";
let sc_upmw_displayStructure_class_title = "sc_upmw_post_title";
let sc_upmw_displayStructure_class_datePost = "sc_upmw_post_datePost";
let sc_upmw_displayStructure_class_dateLink = "sc_upmw_post_dateLink";
let sc_upmw_displayStructure_class_author = "sc_upmw_post_author";
let sc_upmw_displayStructure_class_tags = "sc_upmw_post_tags";
let sc_upmw_displayStructure_class_tagText = "sc_upmw_post_tagText";
let sc_upmw_displayStructure_class_description = "sc_upmw_post_description";
let sc_upmw_displayStructure_class_content = "sc_upmw_post_content";
let sc_upmw_displayStructure_class_titleImage = "sc_upmw_post_titleImg";
let sc_upmw_displayStructure_class_thumbImage = "sc_upmw_post_thumbImage";
let sc_upmw_displayStructure_class_comments = "sc_upmw_post_comments";
let sc_upmw_displayStructure_class_links = "sc_upmw_post_links";
let sc_upmw_displayStructure_class_share = "sc_upmw_post_share";

// Display container settings
let sc_upmw_displaySetting_startWLoad = true;   // If display containers show a 'loading' element before opening
let sc_upmw_displaySetting_loadContent = `<div class="sc_upmw_loadingPlaceholder"></div>`;   // Uses this as the loading replacement element
let sc_upmw_displaySetting_highlightOrder = "post";                   // Order of elements in a highlight element
let sc_upmw_displaySetting_archiveOrder = "search;sort;post;nav";          // Order of elements in an archive element
let sc_upmw_displaySetting_galleryOrder = "sort;tag;date;search;post;nav"; // Order of elements in a gallery element
                                                                      // Exclude an element to remove it from the order
                                                                      // "tag" = tag sorting
                                                                      // "date" = date sorting
                                                                      // "search" = search bar
                                                                      // "post" = post links
                                                                      // "nav" = 'next' and 'prev' buttons
let sc_upmw_displaySetting_minDateText = "Earliest";    // Text that appears before the 'early' date limit
let sc_upmw_displaySetting_maxDateText = "Latest";      // Text that appears before the 'latest' date limit
let sc_upmw_displaySetting_searchText = "Search";       // Text that appears before the search bar
let sc_upmw_displaySetting_searchPlaceholder = "Search..."; // Text inside the search bar before the user clicks it
let sc_upmw_displaySetting_searchOptionCustom = true;     // If true, use a custom checkbox for CSS editing
let sc_upmw_displaySetting_searchCategoryArray = [["title","Title"], ["author","Author"], ["desc","Description"], ["cont","Content"], ["titleImgAlt","Title Image ALT"], ["thumbImgAlt","Thumbnail Image ALT"], ["links","Additional Links"]];
                                                          // The search options available, formatted: 
                                                          // ["value", "name user views"]. Leave empty as [] to remove
                                                          // search options from the display containers.
                                                          // title = Title of the post
                                                          // author = Name of the author
                                                          // desc = Description in post links
                                                          // cont = Text in the post
                                                          // titleImgAlt / thumbImgAlt = ALT on main images
                                                          // links = Links in the additional link section
let sc_upmw_displaySetting_tagOrder = "auto";             // How tags are sorted in the display container
                                                          // auto = based on the posts in the postList.txt
                                                          // alphaAsc / alphaDesc = alphabetical
let sc_upmw_displaySetting_sortText = "Sort by";          // Text that appears before the sort dropdown
let sc_upmw_displaySetting_sortOrder = "auto";            // How posts are automatically sorted
                                                          // auto = how you entered the posts in the postList.txt
                                                          // chronoAsc / chronoDesc = chronological
                                                          // alphaAsc / alphaDesc = alphabetical
let sc_upmw_displaySetting_sortArray = [["auto", "Manual"], ["chronoAsc", "Newest"], ["chronoDesc", "Oldest"], ["alphaAsc", "Ascending Title"], ["alphaDesc", "Descending Title"]];
                                                          // The sort orders available, can only use values listed next to
                                                          // the sc_upmw_displaySetting_sortOrder variable
                                                          // Formatted 2D array with ["value", "name user views"]
let sc_upmw_displaySetting_nextButtonText = "Older";      // Text that appears on the 'back' button
let sc_upmw_displaySetting_prevButtonText = "Newer";      // Text that appears on the 'next' button
let sc_upmw_displaySetting_showPageNumbers = true;        // Show clickable page numbers between the nav buttons
let sc_upmw_displaySetting_showPageNumbersCustom = false; // Use the custom page numbers array instead of numbers
let sc_upmw_displaySetting_showPageNumberAmount = 5;      // How many page numbers are shown at once, leave as 0 to show all
                                                          // This will automatically raise the number to an odd number
                                                          // e.g. 4 becomes 5
                                                          // The page numbers on the left and right will also always
                                                          // be half, i.e. if the current page is "1" and you have 5 page
                                                          // numbers allowed, it will appear as: 0 [1] 2 3
let sc_upmw_displaySetting_customPageNumbers = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];                                                      // Custom page numbers instead of using 1-9, will loop
                                                          //  the array if it reaches the end
let sc_upmw_displaySetting_postShareText = "Share";       // Text that appears on the 'share' link
let sc_upmw_displaySetting_totalPostsVisible = 5;         // How many posts are visible, set to 0 to show all
let sc_upmw_displaySetting_defaultDisplayFormat = "link"; // How posts are displayed
                                                          // link = Clickable summaries that open a larger post fullscreen
                                                          // expand = Clickable summaries that open posts inline
                                                          // full = Shows full posts inline


// --------------------------------------------------------------------------------------------------------------
// ------------------------- DON'T EDIT PAST THIS POINT UNLESS PROFICIENT IN JAVASCRIPT -------------------------
// --------------------------------------------------------------------------------------------------------------
// ----------------------------------------------- START FUNCTION -----------------------------------------------
function sc_upmw_Start() {
  sc_upmw_func_FileGet();
}



// ------------------------ DEFAULT VARIABLE SET UP, USED IN CASE OF FORMAT FILE FAILURE ------------------------
if (sc_upmw_displayStructure_allLink=="") {sc_upmw_displayStructure_allLink = "thumbImg;title;dateLink;author;tags;description";}
if (sc_upmw_displayStructure_allPostHeader=="") {sc_upmw_displayStructure_allPostHeader = "title;datePost;author;tags;titleImg";}
if (sc_upmw_displayStructure_allPostBody=="") {sc_upmw_displayStructure_allPostBody = "content;comments";}
if (sc_upmw_displayStructure_allPostFooter=="") {sc_upmw_displayStructure_allPostFooter = "links;share";}

const sc_upmw_varDefault_timeMonthLong = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"
  ];

const sc_upmw_varDefault_timeDayLong = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];



// -------------------------------- SET UP POST OBJECTS AND REQUIRED INFORMATION --------------------------------
function sc_upmw_PostObject(index, url) {
  if (sc_upmw_postDefaultActive) {
    this.title = sc_upmw_postDefaultProperty_title;               // Title of the post (HTML friendly)
    this.datePostText = sc_upmw_postDefaultProperty_datePostText; // How the date is presented in a post (String only)
    this.dateLinkText = sc_upmw_postDefaultProperty_dateLinkText; // How the date is presented in a post link (String only)
    this.author = sc_upmw_postDefaultProperty_author;             // Author of the post (HTML friendly)
    this.tagList = sc_upmw_postDefaultProperty_tagList;           // Tags / categories on the post (Array only)
    this.desc = sc_upmw_postDefaultProperty_desc;                 // Short summary for post links and previews (String only)
    this.cont = sc_upmw_postDefaultProperty_cont;                 // Content / body of the post (HTML friendly)
    this.titleImg = sc_upmw_postDefaultProperty_titleImg;         // Main image for the post (String URL to image only)
    this.titleImgAlt = sc_upmw_postDefaultProperty_titleImgAlt;   // Main image ALT (String only)
    this.thumbImg = sc_upmw_postDefaultProperty_thumbImg;         // Small / thumbnail image for the post (small file size) (String URL to image only)
    this.thumbImgAlt = sc_upmw_postDefaultProperty_thumbImgAlt;   // Thumb image ALT (String only)
    this.links = sc_upmw_postDefaultProperty_links;               // External or internal href links (HTML friendly String only)
    this.comment = sc_upmw_postDefaultProperty_comment;           // Additional element, usually for comments (HTML friendly)
    this.classAdd = sc_upmw_postDefaultProperty_classAdd;         // What classes to add to this post (Array only)
    this.redirect = sc_upmw_postDefaultProperty_redirect;         // Where to go when clicked on, if not opening the post (String URL only)
  } else {
    this.title = "";                                              // Title of the post (HTML friendly)
    this.datePostText = "";                                       // How the date is presented in a post (String only)
    this.dateLinkText = "";                                       // How the date is presented in a post link (String only)
    this.author = "";                                             // Author of the post (HTML friendly)
    this.tagList = [];                                            // Tags / categories on the post (Array only)
    this.desc = "";                                               // Short summary for post links and previews (String only)
    this.cont = "";                                               // Content / body of the post (HTML friendly)
    this.titleImg = "";                                           // Main image for the post (String URL to image only)
    this.titleImgAlt = "";                                        // Main image ALT (String only)
    this.thumbImg = "";                                           // Small / thumbnail image for the post (small file size) (String URL to image only)
    this.thumbImgAlt = "";                                        // Thumb image ALT (String only)
    this.links = "";                                              // External or internal href links (HTML friendly String only)
    this.comment = "";                                            // Additional element, usually for comments (HTML friendly)
    this.classAdd = [];                                           // What classes to add to this post (Array only)
    this.redirect = "";                                           // Where to go when clicked on, if not opening the post (String URL only)
  }
  this.index = index;                                           // Where the post is in the array (Integer only)
  this.date = "";                                               // Date of the post (Date object only)
  this.scheduleEdit = false;                                    // If the post should be greyed out due to scheduling (Boolean only)
  this.url = url;                                               // Link to the post from current file (URL string only)
  this.rawFile = "";                                            // String inside the file (String only)
  
  // HTML guides for link display, gives a ";" split list of elements that changes into a HTML string
  this.linkHTML_archive = sc_upmw_displayStructure_allLink;
  this.linkHTML_gallery = sc_upmw_displayStructure_allLink;
  this.linkHTML_highlight = sc_upmw_displayStructure_allLink;
  if (sc_upmw_displayStructure_archiveLink != "") {this.linkHTML_archive = sc_upmw_displayStructure_archiveLink;}
  if (sc_upmw_displayStructure_galleryLink != "") {this.linkHTML_gallery = sc_upmw_displayStructure_galleryLink;}
  if (sc_upmw_displayStructure_highlightLink != "") {this.linkHTML_highlight = sc_upmw_displayStructure_highlightLink;}
  
  //HTML guides for post display, gives a ";" split list of elements that changes into a HTML string
  this.postHTML = "header;" + sc_upmw_displayStructure_allPostHeader + ";divEnd;body;" +  sc_upmw_displayStructure_allPostBody + ";divEnd;footer;" + sc_upmw_displayStructure_allPostFooter + ";divEnd";
}

function sc_upmw_DisplayObject(index, type, HTMLObject) {
  this.index = index;         // Index of the display container in the 'all' array (INT)
  this.type = type;           // What type of container it is (STRING) (archive, gallery, highlight)
  this.sortOrder = sc_upmw_displaySetting_sortOrder;    // How to sort the posts (STRING) (chronoAsc, chronoDes, alphaAsc, alphaDes, auto)
  this.tagLimit = [];         // An array with tags that are permanently included, or excluded, from the display (ARRAY)
  this.tagInc = [];           // User chosen included tags (ARRAY)
  this.tagExc = [];           // User chosen excluded tags (ARRAY)
  this.postList = [];         // All posts the display can show (removes taglimit: exclusion tags so they never appear) (ARRAY)
  this.postVisible = [];     // Posts from postList that can be seen (impacted by tagInc/Exc and sort order) (ARRAY)
  this.postVisIndex = 0;      // Index of post that's visible (start), this changes when clicking through pages (INT)
  this.postPerPage = sc_upmw_displaySetting_totalPostsVisible;  // How many posts are visible at a time (INT)
  this.displayFormat = sc_upmw_displaySetting_defaultDisplayFormat;  // How posts are displayed (link, expand, full) (STRING)
  this.HTMLObject = HTMLObject;       // HTML object assigned to this object (HTML Node)
  this.tagObject = document.createElement("div");       // Object that shows tag sorting (HTML Node)
  this.tagButtons = [];                                 // Tag buttons for this container (Object Array only)
  this.dateObject = document.createElement("div");      // Object that shows date sorting (HTML Node)
  this.dateButtons = [];                                // Where the date button options are stored (Object Array only)
  this.searchObject = document.createElement("div");    // Object that shows the search bar (HTML Node)
  this.searchBar = document.createElement("input");     // Search bar in the search object (HTML Node)
  this.searchOptions = [];                              // Search checkbox options (Object Array only)
  this.sortContainer = document.createElement("div");   // Container that shows the sort order options (HTML Node)
  this.sortOrder = document.createElement("select");    // Dropdown for the sort order (HTML Node)
  this.postObject = document.createElement("div");      // Object that shows the post links (HTML Node)
  this.navObject = document.createElement("div");       // Object that shows the navigation bar (next prev buttons) (HTML Node)
  this.navButtons = [];                                 // Nav buttons for this container (Object Array only)
  this.navPageButtons = [];                             // Nav page buttons for this container (Object Array only)
}

function sc_upmw_TagButtonObject(displayIndex, tagName) {
  this.displayIndex = displayIndex;   // Which display container the button belongs to
  this.tagName = tagName;             // Which tag the button controls
  this.tagStatus = "neutral";         // Is the tag being "excluded", "included", or has no effect ("neutral")
  this.HTMLObject = document.createElement("button"); // Button that controls the tag sorting
}

function sc_upmw_DateButtonObject(displayIndex, position) {
  this.displayIndex = displayIndex;   // Which display container the button belongs to
  this.position = position;           // If the object is the min (0) or max (1)
  this.HTMLObject = document.createElement("input"); // Object that controls the date sorting
}

function sc_upmw_searchOptionObject(displayIndex, searchCategory) {
  this.displayIndex = displayIndex;   // Which display container the button belongs to
  this.searchCategory = searchCategory;       // The search category the checkbox relates to
  this.HTMLObject = document.createElement("input"); // Object that controls the search option
}

function sc_upmw_NavButtonObject(displayIndex, postAmount) {
  this.displayIndex = displayIndex;   // Which display container the button belongs to
  this.postAmount = postAmount;       // How many posts it moves back or forth between (i.e. -2 takes the page back 2 posts)
  this.HTMLObject = document.createElement("button"); // Object that controls the navigation
}

function sc_upmw_NavPageObject(displayIndex, postIndex) {
  this.displayIndex = displayIndex;   // Which display container the button belongs to
  this.postIndex = postIndex;       // The postVisIndex the button relates to
  this.HTMLObject = document.createElement("button"); // Object that controls the navigation
}



// --------------------------------------------- COLLECT TEXT FILES ---------------------------------------------
// Containers for the text file raw results
let sc_upmw_txtFile_postList_string = "";
let sc_upmw_postList = [];

// Display containers on page
let sc_upmw_displayContainer_archives = [];
let sc_upmw_displayContainer_galleries = [];
let sc_upmw_displayContainer_highlights = [];

// Collect all the necessary files for startup
function sc_upmw_func_FileGet() {
  
  // Check & collect which types of post-displayers are on the page
  sc_upmw_displayContainer_archivesHTML = document.getElementsByClassName(sc_upmw_containerClass_archive);
  sc_upmw_displayContainer_galleriesHTML = document.getElementsByClassName(sc_upmw_containerClass_gallery);
  sc_upmw_displayContainer_highlightsHTML = document.getElementsByClassName(sc_upmw_containerClass_highlight);
  
  // Set up loading text
  if (sc_upmw_displaySetting_startWLoad) {
    for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_displayContainer_archivesHTML.length; sc_upmw_i++) {
      sc_upmw_displayContainer_archivesHTML[sc_upmw_i].innerHTML = sc_upmw_displaySetting_loadContent;}
    for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_displayContainer_galleriesHTML.length; sc_upmw_i++) {
      sc_upmw_displayContainer_galleriesHTML[sc_upmw_i].innerHTML = sc_upmw_displaySetting_loadContent;}
    for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_displayContainer_highlightsHTML.length; sc_upmw_i++) {
      sc_upmw_displayContainer_highlightsHTML[sc_upmw_i].innerHTML = sc_upmw_displaySetting_loadContent;}
  }
  
  // Get the post list
  fetch(sc_upmw_txtFile_postList)
      .then(response => response.text())
      .then(text => {
        sc_upmw_txtFile_postList_string = text;
      })
      .catch(error => {
        clearInterval(sc_upmw_timer_fileWait_control);
        alert(`ERROR WITH POST LIST COLLECTION
        ` + error);
      });
}

// Get the post files
function sc_upmw_func_PostGet() {  
  // Check if post list is valid or has defaulted to collecting the HTML file
  if (sc_upmw_txtFile_postList_string.startsWith("<!DOCTYPE")) {
    clearInterval(sc_upmw_timer_fileWait_control);
    alert("ERROR: Incorrect file collected for Post List, halting script");
  } else {
    // Separate out the file names in the post list and check their vailidity
    let sc_upmw_postList_strings = sc_upmw_txtFile_postList_string.split(/\r?\n/);
    
    for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_postList_strings.length; sc_upmw_i++) {
      // Skip empty, comments, or not .txt strings
      if(sc_upmw_postList_strings[sc_upmw_i] != "" && !sc_upmw_postList_strings[sc_upmw_i].startsWith("//") && sc_upmw_postList_strings[sc_upmw_i].endsWith(".txt")) {
        // Create a new object for each post listed in the post list
        sc_upmw_postList[sc_upmw_i] = new sc_upmw_PostObject(sc_upmw_i, sc_upmw_folder_postStorage + sc_upmw_postList_strings[sc_upmw_i]);
        sc_upmw_func_imagesToValidate += 2; // Add to image count for validation
        
        // If image lookup is active, collect the image with the same URL as the text file
        if (sc_upmw_postAutoFinder_imageLookup) {
          sc_upmw_postList[sc_upmw_i].titleImg = sc_upmw_postList[sc_upmw_i].url.split(".txt")[0] + sc_upmw_postAutoFinder_titleImgSuffix;
          sc_upmw_postList[sc_upmw_i].thumbImg = sc_upmw_postList[sc_upmw_i].url.split(".txt")[0] + sc_upmw_postAutoFinder_thumbImgSuffix;
        }
        
        // Split file name for the date and title, set up variables
        let sc_upmw_temp_fileSplit = sc_upmw_postList_strings[sc_upmw_i].split("-");
        let sc_upmw_temp_fileTitle = "";
        let sc_upmw_temp_fileDate_strings = [];
        let sc_upmw_temp_fileDate = new Date (0,0,0,0,0);
        
        // Convert file name split into usable data
        for (sc_upmw_ii = 0; sc_upmw_ii < sc_upmw_temp_fileSplit.length; sc_upmw_ii++) {
          // Check if the first part of the script contains a date
          if (isNaN(sc_upmw_temp_fileSplit[sc_upmw_ii]) && sc_upmw_ii==0) {
            sc_upmw_temp_fileSplit.unshift(sc_upmw_postTimeSetting_defaultYear);
          }
          
          // Check if the next part of the file name is for the date or the name
          if (isNaN(sc_upmw_temp_fileSplit[sc_upmw_ii]) || sc_upmw_ii > 4) {
            // Part of the title
            sc_upmw_temp_fileTitle += sc_upmw_temp_fileSplit[sc_upmw_ii];
            // Check if the title's removed a '-' symbol and replace it
            if (sc_upmw_ii != sc_upmw_temp_fileSplit.length - 1) {
              sc_upmw_temp_fileTitle += "-";
            }
          } 
          
          else {
            // Part of the date, push to date string
            sc_upmw_temp_fileDate_strings.push(parseInt(sc_upmw_temp_fileSplit[sc_upmw_ii]));
            // Check if next part is a number, if not then start making a date
            if (isNaN(sc_upmw_temp_fileSplit[sc_upmw_ii + 1]) || sc_upmw_ii == 4) {
              // Add missing date parts if not provided
              if (sc_upmw_temp_fileDate_strings.length != 5) {
                if (!sc_upmw_temp_fileDate_strings[0]){sc_upmw_temp_fileDate_strings[0] = sc_upmw_postTimeSetting_defaultYear}
                if (!sc_upmw_temp_fileDate_strings[1]){sc_upmw_temp_fileDate_strings[1] = sc_upmw_postTimeSetting_defaultMonth}
                if (!sc_upmw_temp_fileDate_strings[2]){sc_upmw_temp_fileDate_strings[2] = sc_upmw_postTimeSetting_defaultDay}
                if (!sc_upmw_temp_fileDate_strings[3]){sc_upmw_temp_fileDate_strings[3] = sc_upmw_postTimeSetting_defaultHour}
                if (!sc_upmw_temp_fileDate_strings[4]){sc_upmw_temp_fileDate_strings[4] = sc_upmw_postTimeSetting_defaultMinute}
              }
              // Convert date string into date object, first into UTC then Local
              sc_upmw_temp_fileDate = new Date(Date.UTC(sc_upmw_temp_fileDate_strings[0], sc_upmw_temp_fileDate_strings[1]-1, sc_upmw_temp_fileDate_strings[2], sc_upmw_temp_fileDate_strings[3], sc_upmw_temp_fileDate_strings[4]));
              sc_upmw_temp_fileDate = new Date(sc_upmw_temp_fileDate - (sc_upmw_timezone * 60 * 60000));
            }
          }
        }
        
        // Set post basic object information
        sc_upmw_postList[sc_upmw_i].title = sc_upmw_temp_fileTitle.split(".txt")[0];
        sc_upmw_postList[sc_upmw_i].date = sc_upmw_temp_fileDate;
        
        // Correct title based on title formatting
        switch (sc_upmw_postDisplaySetting_titleSplitType) {
          case "camelCase":
            sc_upmw_postList[sc_upmw_i].title = sc_upmw_postList[sc_upmw_i].title.replace(/([a-z])([A-Z])/g, '$1 $2');
            break;
          case "underscore":
            sc_upmw_postList[sc_upmw_i].title = sc_upmw_postList[sc_upmw_i].title.replaceAll('_', ' ');
            break;
        }
        
        // Format date (catches defaults if not updated later)
        if (sc_upmw_postList[sc_upmw_i].dateLinkText != "") {
          sc_upmw_postList[sc_upmw_i].dateLinkText = sc_upmw_func_FormatDate(sc_upmw_postList[sc_upmw_i].date, sc_upmw_postList[sc_upmw_i].dateLinkText);
        }
        if (sc_upmw_postList[sc_upmw_i].datePostText != "") {
          sc_upmw_postList[sc_upmw_i].datePostText = sc_upmw_func_FormatDate(sc_upmw_postList[sc_upmw_i].date, sc_upmw_postList[sc_upmw_i].datePostText);
        }
      } else {
        // Remove any file paths that do NOT meet the standards above
        if(sc_upmw_postList_strings[sc_upmw_i] != "" && !sc_upmw_postList_strings[sc_upmw_i].startsWith("//")) {console.log("Error collecting " + sc_upmw_postList_strings[sc_upmw_i]);}
        sc_upmw_postList_strings.splice(sc_upmw_i, 1);
        sc_upmw_i --;
      }
    }
    
    // Remove / edit files that wouldn't be accessible if scheduling is active
    if (sc_upmw_postDisplaySetting_scheduling) {
      for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_postList.length; sc_upmw_i++) {
        // If post is set to a future date
        if (new Date() < sc_upmw_postList[sc_upmw_i].date) {
          if (sc_upmw_postDisplaySetting_scheduledHidden) {
            // Remove post from list
            sc_upmw_postList.splice(sc_upmw_i, 1);
            sc_upmw_i -= 1;
          }
          else {
            // Change post to be inaccessible via class setting
            sc_upmw_postList[sc_upmw_i].scheduleEdit = true;
          }
        } 
        // If post is set to the current, or a past, time
        else {sc_upmw_postList[sc_upmw_i].scheduleEdit = false;}
      }
    }
    
    // Collect post files
    sc_upmw_postList.forEach(post => {
      fetch(post.url)
        .then(response => response.text())
        .then(text => {
          if (text.startsWith("<!DOCTYPE")){
            console.log("Error collecting " + post.url);
            sc_upmw_postList.splice(sc_upmw_postList.indexOf(post), 1);
          }
          else {
            if (text == "") {text = "Null Text";}
            post.rawFile = text;
            }
          })
        .catch(error => {
          console.log("Error collecting " + post.url);
          sc_upmw_postList.splice(sc_upmw_postList.indexOf(post), 1);
          });
    });
  }
}



// ---------------------------------- COMPLETE POST OBJECTS FROM RAWFILE DATA ----------------------------------
let sc_upmw_postViewer = document.createElement("div");
let sc_upmw_postViewer_postFill = document.createElement("div");
let sc_upmw_postViewer_buttonPrev = document.createElement("button");
let sc_upmw_postViewer_buttonNext = document.createElement("button");
let sc_upmw_postViewer_lastClicked;
let sc_upmw_allPosts_tagList = [];  // Taglist that the user can click through to sort

function sc_upmw_func_PostFill() {
  // Set up fullscreen post object
  let sc_upmw_postViewer_closeButton = document.createElement("button");
  sc_upmw_postViewer.id = sc_upmw_postDisplaySetting_postFullscreenID;
  sc_upmw_postViewer.tabIndex = 0;
  document.body.appendChild(sc_upmw_postViewer);
  sc_upmw_postViewer.appendChild(sc_upmw_postViewer_buttonPrev);
  sc_upmw_postViewer.appendChild(sc_upmw_postViewer_buttonNext);
  sc_upmw_postViewer_buttonPrev.id = sc_upmw_postDisplaySetting_postFullscreenID + "_prevButton";
  sc_upmw_postViewer_buttonNext.id = sc_upmw_postDisplaySetting_postFullscreenID + "_nextButton";
  sc_upmw_postViewer.appendChild(sc_upmw_postViewer_closeButton);
  sc_upmw_postViewer_closeButton.id = sc_upmw_postDisplaySetting_postFullscreenID + "_closeButton";
  sc_upmw_postViewer.appendChild(sc_upmw_postViewer_postFill);
  sc_upmw_postViewer_postFill.id = sc_upmw_postDisplaySetting_postFullscreenID + "_inner";
  
  // Add button text and event listeners
  sc_upmw_postViewer_closeButton.innerText = sc_upmw_postDisplaySetting_postFullscreen_closeButtonText;
  sc_upmw_postViewer_closeButton.addEventListener("click", e=>{
    sc_upmw_postViewer.style.display = "none";
    window.location.href = window.location.href.split("#")[0] + "#";
    sc_upmw_postViewer_lastClicked.focus();
    // re-enable HTML document scrolling
    document.body.style.removeProperty("overflow");
  });
  
  sc_upmw_postViewer_buttonPrev.innerText = sc_upmw_postDisplaySetting_postFullscreen_prevButtonText;
  sc_upmw_postViewer_buttonPrev.addEventListener("click", e=>
  sc_upmw_func_postInteract(sc_upmw_postViewer_currentDisplay, sc_upmw_postViewer_currentPost - 1, sc_upmw_postViewer_currentFormat, sc_upmw_postViewer_HTMLObject));
  
  sc_upmw_postViewer_buttonNext.innerText = sc_upmw_postDisplaySetting_postFullscreen_nextButtonText;
  sc_upmw_postViewer_buttonNext.addEventListener("click", e=>
  sc_upmw_func_postInteract(sc_upmw_postViewer_currentDisplay, sc_upmw_postViewer_currentPost + 1, sc_upmw_postViewer_currentFormat, sc_upmw_postViewer_HTMLObject));
  
	// Adds a document listener to allow for post viewer hiding & left / right button clicking for the gallery
	document.addEventListener("keydown", function(e) {
	  if (sc_upmw_postViewer.style.display == "block") {
		if (e.keyCode == 27) {  // Close button
      sc_upmw_postViewer.style.display = "none";
      window.location.href = window.location.href.split("#")[0] + "#";
      sc_upmw_postViewer_lastClicked.focus();
      // re-enable HTML document scrolling
      document.body.style.removeProperty("overflow");
		} else if (e.keyCode == 37 && sc_upmw_postViewer_buttonPrev.disabled == false) {
		  sc_upmw_func_postInteract(sc_upmw_postViewer_currentDisplay, sc_upmw_postViewer_currentPost - 1, sc_upmw_postViewer_currentFormat, sc_upmw_postViewer_HTMLObject);
		} else if (e.keyCode == 39 && sc_upmw_postViewer_buttonNext.disabled == false) {
		  sc_upmw_func_postInteract(sc_upmw_postViewer_currentDisplay, sc_upmw_postViewer_currentPost + 1, sc_upmw_postViewer_currentFormat, sc_upmw_postViewer_HTMLObject);
		}
	  }
	});
  
  
  
  for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_postList.length; sc_upmw_i++) {
    // Break down post's text file
    let sc_upmw_temp_rawFileBreakdown = sc_upmw_postList[sc_upmw_i].rawFile.split(":>>");
    
    // Check each breakdown's starting point and assign to appropriate property
    for (sc_upmw_ii = 0; sc_upmw_ii < sc_upmw_temp_rawFileBreakdown.length; sc_upmw_ii++) {
      // Check if this property is valid
      if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1]) {
        let sc_upmw_temp_rawFileProperty = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1];
        
        // Check for title
        if (sc_upmw_temp_rawFileProperty.startsWith("TITLE:")) {
          sc_upmw_postList[sc_upmw_i].title = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<TITLE:")[1].trim();
        } 
        // Check for post date formatting
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("DATEPOST:")) {
          sc_upmw_postList[sc_upmw_i].datePostText = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<DATEPOST:")[1].trim();
          // Replace formatting with real date
          sc_upmw_postList[sc_upmw_i].datePostText = sc_upmw_func_FormatDate(sc_upmw_postList[sc_upmw_i].date, sc_upmw_postList[sc_upmw_i].datePostText);
        }
        // Check for post link formatting
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("DATELINK:")) {
          sc_upmw_postList[sc_upmw_i].dateLinkText = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<DATELINK:")[1].trim();
          // Replace formatting with real date
          sc_upmw_postList[sc_upmw_i].dateLinkText = sc_upmw_func_FormatDate(sc_upmw_postList[sc_upmw_i].date, sc_upmw_postList[sc_upmw_i].dateLinkText);
        }
        // Check for author
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("AUTHOR:")) {
          sc_upmw_postList[sc_upmw_i].author = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<AUTHOR:")[1].trim();
        }
        // Check for tags
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("TAGS:")) {
          sc_upmw_postList[sc_upmw_i].tagList = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<TAGS:")[1].trim();
          sc_upmw_postList[sc_upmw_i].tagList = sc_upmw_postList[sc_upmw_i].tagList.split(";");
          for (sc_upmw_iii = 0; sc_upmw_iii < sc_upmw_postList[sc_upmw_i].tagList.length; sc_upmw_iii++) {
            sc_upmw_postList[sc_upmw_i].tagList[sc_upmw_iii] = sc_upmw_postList[sc_upmw_i].tagList[sc_upmw_iii].trim();
            if (!sc_upmw_allPosts_tagList.includes(sc_upmw_postList[sc_upmw_i].tagList[sc_upmw_iii])) {
              sc_upmw_allPosts_tagList.push(sc_upmw_postList[sc_upmw_i].tagList[sc_upmw_iii]);
            }
          }
        }
        // Check for description
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("DESCRIPTION:")) {
          sc_upmw_postList[sc_upmw_i].desc = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<DESCRIPTION:")[1].trim();
        }
        // Check for content
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("CONTENT:")) {
          sc_upmw_postList[sc_upmw_i].cont = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<CONTENT:")[1].trim();
        }
        // Check for title image
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("TITLEIMG:")) {
          sc_upmw_postList[sc_upmw_i].titleImg = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<TITLEIMG:")[1].trim();
        }
        // Check for title image ALT
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("TITLEIMGALT:")) {
          sc_upmw_postList[sc_upmw_i].titleImgAlt = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<TITLEIMGALT:")[1].trim().replaceAll('"', "'");
        }
        // Check for thumbnail image
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("THUMBIMG:")) {
          sc_upmw_postList[sc_upmw_i].thumbImg = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<THUMBIMG:")[1].trim();
        }
        // Check for thumbnail image ALT
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("THUMBIMGALT:")) {
          sc_upmw_postList[sc_upmw_i].thumbImgAlt = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<THUMBIMGALT:")[1].trim().replaceAll('"', "'");
        }
        // Check for links
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("LINKS:")) {
          sc_upmw_postList[sc_upmw_i].links = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<LINKS:")[1].trim();
        }
        // Check for comments
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("COMMENTS:")) {
          sc_upmw_postList[sc_upmw_i].comment = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<COMMENTS:")[1].trim();
        }
        // Check for class additions
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("CLASSES:")) {
          sc_upmw_postList[sc_upmw_i].classAdd = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<CLASSES:")[1].trim();
          sc_upmw_postList[sc_upmw_i].classAdd = sc_upmw_postList[sc_upmw_i].classAdd.split(";");
          for (sc_upmw_iii = 0; sc_upmw_iii < sc_upmw_postList[sc_upmw_i].classAdd.length; sc_upmw_iii++) {
            sc_upmw_postList[sc_upmw_i].classAdd[sc_upmw_iii] = sc_upmw_postList[sc_upmw_i].classAdd[sc_upmw_iii].trim();
          }
        }
        // Check for redirect links
        else if (sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<")[1].startsWith("REDIRECT:")) {
          sc_upmw_postList[sc_upmw_i].redirect = sc_upmw_temp_rawFileBreakdown[sc_upmw_ii].split("<<REDIRECT:")[1].trim();
        }
      }
    }
    
    // Check if images provided are valid, replaces them with the default image and ALT if not
    sc_upmw_func_ImageValidator(sc_upmw_postList[sc_upmw_i]);
    
    // Give the post the necessary HTML guides
    sc_upmw_postList[sc_upmw_i].linkHTML_archive = sc_upmw_func_FormatPostHTML(sc_upmw_postList[sc_upmw_i], sc_upmw_postList[sc_upmw_i].linkHTML_archive);
    sc_upmw_postList[sc_upmw_i].linkHTML_gallery = sc_upmw_func_FormatPostHTML(sc_upmw_postList[sc_upmw_i], sc_upmw_postList[sc_upmw_i].linkHTML_gallery);
    sc_upmw_postList[sc_upmw_i].linkHTML_highlight = sc_upmw_func_FormatPostHTML(sc_upmw_postList[sc_upmw_i], sc_upmw_postList[sc_upmw_i].linkHTML_highlight);
    sc_upmw_postList[sc_upmw_i].postHTML = sc_upmw_func_FormatPostHTML(sc_upmw_postList[sc_upmw_i], sc_upmw_postList[sc_upmw_i].postHTML);
    
  }
  sc_upmw_func_PostDisplaySetup();
  
  // Check if URL contains post information
  if (window.location.href.includes("#") && window.location.href.split("#")[1] != "") {
    let sc_upmw_temp_postURLProvided = window.location.href.split("#")[1].split(".txt")[0];
    let sc_upmw_temp_postIndex = 0;
    let sc_upmw_temp_postObject = "";
    
    // Set the focus to the top of the page if the fullscreen post is closed
    sc_upmw_postViewer_lastClicked = document.body;
    
    // Get the index of the post, based on the url
    // Nothing happens if it does not find a matching post
    for (sc_upmw_u=0; sc_upmw_u < sc_upmw_postList.length; sc_upmw_u++) {
      if (sc_upmw_postList[sc_upmw_u].url.split("/")[sc_upmw_postList[sc_upmw_u].url.split("/").length-1].split(".txt")[0] == sc_upmw_temp_postURLProvided) {
        sc_upmw_temp_postIndex = sc_upmw_postList[sc_upmw_u].index;
        sc_upmw_temp_postObject = sc_upmw_postList[sc_upmw_u];
    
        // Set up post viewer variables
        sc_upmw_postViewer.style.display = "block";
        sc_upmw_postViewer.focus();
        
        // Previous & next buttons 
        sc_upmw_postViewer_buttonPrev.disabled = true;
        sc_upmw_postViewer_buttonNext.disabled = true;
        
        // Insert HTML into post fill on the post viewer
        sc_upmw_postViewer_postFill.classList.remove(sc_upmw_postDisplaySetting_postFullscreen_redirectClass);
        sc_upmw_postViewer_postFill.classList.remove(sc_upmw_postDisplaySetting_postFullscreen_scheduledClass);
        
        if (sc_upmw_temp_postObject.redirect != "") {
          // If it's a redirect post, go to the redirected link
          window.location.href = sc_upmw_temp_postObject.redirect;
        } else if (sc_upmw_temp_postObject.scheduleEdit) {
          // If it's a scheduled post, hide the post information
          sc_upmw_postViewer_postFill.innerHTML = "";
          sc_upmw_postViewer_postFill.classList.add(sc_upmw_postDisplaySetting_postFullscreen_scheduledClass);
        } else {
          sc_upmw_postViewer_postFill.innerHTML = sc_upmw_temp_postObject.postHTML;
        }
        
        // Process any script elements
        sc_upmw_UserScriptProcessing(sc_upmw_postViewer_postFill, sc_upmw_temp_postIndex);
        
        sc_upmw_u = sc_upmw_postList.length;
      }
    }
  }
}



// ----------------------------- CREATE DISPLAY OBJECTS DEPENDING ON CLASS PRESENCE -----------------------------
let sc_upmw_displayContainer_all = [];
let sc_upmw_displayContainer_archivesHTML = [];
let sc_upmw_displayContainer_galleriesHTML = [];
let sc_upmw_displayContainer_highlightsHTML = [];
let sc_upmw_displayContainer_counter = 0;

function sc_upmw_func_PostDisplaySetup() {  
  // Convert HTML objects collected into sc_upmw_DisplayObject objects
  if (sc_upmw_displayContainer_archivesHTML[0]) {
    for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_displayContainer_archivesHTML.length; sc_upmw_i++) {
      // Create display object
      sc_upmw_displayContainer_archives[sc_upmw_i] = new sc_upmw_DisplayObject(sc_upmw_displayContainer_counter, "archive", sc_upmw_displayContainer_archivesHTML[sc_upmw_i]);
      sc_upmw_displayContainer_counter++;
      sc_upmw_displayContainer_all.push(sc_upmw_displayContainer_archives[sc_upmw_i]);
    }
  }
  if (sc_upmw_displayContainer_galleriesHTML[0]) {
    for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_displayContainer_galleriesHTML.length; sc_upmw_i++) {
      // Create display object
      sc_upmw_displayContainer_galleries[sc_upmw_i] = new sc_upmw_DisplayObject(sc_upmw_displayContainer_counter, "gallery", sc_upmw_displayContainer_galleriesHTML[sc_upmw_i]);
      sc_upmw_displayContainer_counter++;
      sc_upmw_displayContainer_all.push(sc_upmw_displayContainer_galleries[sc_upmw_i]);
    }
  }
  if (sc_upmw_displayContainer_highlightsHTML[0]) {
    for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_displayContainer_highlightsHTML.length; sc_upmw_i++) {
      // Create display object
      sc_upmw_displayContainer_highlights[sc_upmw_i] = new sc_upmw_DisplayObject(sc_upmw_displayContainer_counter, "highlight", sc_upmw_displayContainer_highlightsHTML[sc_upmw_i]);
      sc_upmw_displayContainer_counter++;
      sc_upmw_displayContainer_all.push(sc_upmw_displayContainer_highlights[sc_upmw_i]);
    }
  }
  
  // Format all display containers
  for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_displayContainer_all.length; sc_upmw_i++) {
    // Calculate the taglimit & post per page property
    let sc_upmw_temp_displayClassList = sc_upmw_displayContainer_all[sc_upmw_i].HTMLObject.classList;
    let sc_upmw_temp_tagLimitInc = [];
    let sc_upmw_temp_tagLimitExc = [];
    let sc_upmw_temp_postPerPageLimit = sc_upmw_displaySetting_totalPostsVisible;
    
    for (sc_upmw_ii = 0; sc_upmw_ii < sc_upmw_temp_displayClassList.length; sc_upmw_ii++) {
      // Use classes to determine certain properties of the display container
      if (sc_upmw_temp_displayClassList[sc_upmw_ii].startsWith(sc_upmw_containerClass_tagIncluder)) {
        sc_upmw_temp_tagLimitInc = sc_upmw_temp_displayClassList[sc_upmw_ii].split(sc_upmw_containerClass_tagIncluder)[1].split(";");
      } else if (sc_upmw_temp_displayClassList[sc_upmw_ii].startsWith(sc_upmw_containerClass_tagExcluder)) {
        sc_upmw_temp_tagLimitExc = sc_upmw_temp_displayClassList[sc_upmw_ii].split(sc_upmw_containerClass_tagExcluder)[1].split(";");
      } else if (sc_upmw_temp_displayClassList[sc_upmw_ii].startsWith(sc_upmw_containerClass_postsPerPage)) {
        sc_upmw_temp_postPerPageLimit = parseInt(sc_upmw_temp_displayClassList[sc_upmw_ii].split(sc_upmw_containerClass_postsPerPage)[1]);
        sc_upmw_displayContainer_all[sc_upmw_i].postPerPage = sc_upmw_temp_postPerPageLimit;
      } else if (sc_upmw_temp_displayClassList[sc_upmw_ii].startsWith(sc_upmw_containerClass_postDisplayFormat)) {
        sc_upmw_displayContainer_all[sc_upmw_i].displayFormat = sc_upmw_temp_displayClassList[sc_upmw_ii].split(sc_upmw_containerClass_postDisplayFormat)[1];
      }
    }
    
    // Check if display container needs a 'full posts' class
    if (sc_upmw_displayContainer_all[sc_upmw_i].displayFormat == "full") {sc_upmw_displayContainer_all[sc_upmw_i].HTMLObject.classList.add(sc_upmw_containerClass_fullPostMarker);}
    
    // Fill the included [0] and excluded [1] limits
    sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[0] = sc_upmw_temp_tagLimitInc;
    sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[1] = sc_upmw_temp_tagLimitExc;
    
    // Calculate which posts are accessible from this display container
    if (sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[0][0] || sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[1][0]) {
      // Check how many tags must be included
      let sc_upmw_temp_includedTagAmount = sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[0].length;
      for (sc_upmw_ii = 0; sc_upmw_ii < sc_upmw_postList.length; sc_upmw_ii++) {  // Check each post
        let sc_upmw_temp_tagsIncluded = 0;
        let sc_upmw_temp_hasExcludedTag = false;
        for (sc_upmw_iii = 0; sc_upmw_iii < sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[1].length; sc_upmw_iii++) { 
          // Check each exc. tag
          if (sc_upmw_postList[sc_upmw_ii].tagList.includes(sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[1][sc_upmw_iii])) {
            sc_upmw_temp_hasExcludedTag = true;
            break;
          }
        }
        if (!sc_upmw_temp_hasExcludedTag) {
          for (sc_upmw_iii = 0; sc_upmw_iii < sc_upmw_postList[sc_upmw_ii].tagList.length; sc_upmw_iii++) { // Check each inc. tag
          // Check if the tag being checked is in the included list of tags for this display
            for (sc_upmw_iiii = 0; sc_upmw_iiii < sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[0].length; sc_upmw_iiii++) {
              if (sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[0][sc_upmw_iiii] == sc_upmw_postList[sc_upmw_ii].tagList[sc_upmw_iii]) {
                sc_upmw_temp_tagsIncluded++;
              }
            }
          }
          // Check if all the tags have been included, add the post if they have
          if (sc_upmw_temp_tagsIncluded == sc_upmw_temp_includedTagAmount) {
            sc_upmw_displayContainer_all[sc_upmw_i].postList.push(sc_upmw_postList[sc_upmw_ii]);
          }
        }
      }
    } else {
      // If no tag limits are present, add all posts
      sc_upmw_displayContainer_all[sc_upmw_i].postList = sc_upmw_postList;
    }
  }
  
  // Setup the display containers so they're visible, have tags, and all the HTML elements they need
  // This is a one-time run only, the posts displayed will update through the sc_upmw_func_PostDisplayUpdate() function
  for (sc_upmw_i = 0; sc_upmw_i < sc_upmw_displayContainer_all.length; sc_upmw_i++) {
    // Reset the innerHTML for the element insertion
    sc_upmw_displayContainer_all[sc_upmw_i].HTMLObject.innerHTML = "";
    
    // Set the display element's HTML formatting
    let sc_upmw_temp_displayStructureOrder_link = sc_upmw_displayStructure_allLink;
    let sc_upmw_temp_displayStructureOrder_Header = sc_upmw_displayStructure_allPostHeader;
    let sc_upmw_temp_displayStructureOrder_Body = sc_upmw_displayStructure_allPostBody;
    let sc_upmw_temp_displayStructureOrder_Footer = sc_upmw_displayStructure_allPostFooter;
    
    if (sc_upmw_displayContainer_all[sc_upmw_i].type=="archive") {
      if(sc_upmw_displayStructure_archiveLink != "") {sc_upmw_temp_displayStructureOrder_link=sc_upmw_displayStructure_archiveLink}
    }
    
    if (sc_upmw_displayContainer_all[sc_upmw_i].type=="gallery") {
      if(sc_upmw_displayStructure_galleryLink != "") {sc_upmw_temp_displayStructureOrder_link=sc_upmw_displayStructure_galleryLink}
    }
    
    if (sc_upmw_displayContainer_all[sc_upmw_i].type=="highlight") {
      if(sc_upmw_displayStructure_highlightLink != "") {sc_upmw_temp_displayStructureOrder_link=sc_upmw_displayStructure_highlightLink}
    }
    
    // Give HTML formatting to display container    
    sc_upmw_displayContainer_all[sc_upmw_i].linkFormatting = sc_upmw_temp_displayStructureOrder_link;
    sc_upmw_displayContainer_all[sc_upmw_i].postHeaderFormatting = sc_upmw_temp_displayStructureOrder_Header;
    sc_upmw_displayContainer_all[sc_upmw_i].postBodyFormatting = sc_upmw_temp_displayStructureOrder_Body;
    sc_upmw_displayContainer_all[sc_upmw_i].postFooterFormatting = sc_upmw_temp_displayStructureOrder_Footer;
    
    // Set the display element's order and set up which elements to add
    let sc_upmw_temp_displayOrder = "post";
    switch (sc_upmw_displayContainer_all[sc_upmw_i].type) {
      case "highlight":
        sc_upmw_temp_displayOrder = sc_upmw_displaySetting_highlightOrder;
        break;
      case "archive":
        sc_upmw_temp_displayOrder = sc_upmw_displaySetting_archiveOrder;
        break;
      case "gallery":
        sc_upmw_temp_displayOrder = sc_upmw_displaySetting_galleryOrder;
        break;
    }
    
    // Add the required elements & format as necessary
    for (sc_upmw_ii=0; sc_upmw_ii < sc_upmw_temp_displayOrder.split(";").length; sc_upmw_ii++) {
      switch (sc_upmw_temp_displayOrder.split(";")[sc_upmw_ii]) {
        case "tag":
          sc_upmw_displayContainer_all[sc_upmw_i].HTMLObject.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].tagObject);
          sc_upmw_displayContainer_all[sc_upmw_i].tagObject.classList.add(sc_upmw_containerClass_tagContainer); 
          
          // Add tags based on posts in the post list
          let sc_upmw_temp_fullTagList = [];
          for (sc_upmw_iii=0; sc_upmw_iii < sc_upmw_displayContainer_all[sc_upmw_i].postList.length; sc_upmw_iii++) {
            for (sc_upmw_iiii=0; sc_upmw_iiii < sc_upmw_displayContainer_all[sc_upmw_i].postList[sc_upmw_iii].tagList.length; sc_upmw_iiii++) {
              // If tag isn't already added or a part of the display container's inc/exc rules
              if (!sc_upmw_temp_fullTagList.includes(sc_upmw_displayContainer_all[sc_upmw_i].postList[sc_upmw_iii].tagList[sc_upmw_iiii]) && 
              !sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[0].includes(sc_upmw_displayContainer_all[sc_upmw_i].postList[sc_upmw_iii].tagList[sc_upmw_iiii]) && 
              !sc_upmw_displayContainer_all[sc_upmw_i].tagLimit[1].includes(sc_upmw_displayContainer_all[sc_upmw_i].postList[sc_upmw_iii].tagList[sc_upmw_iiii])) {
                sc_upmw_temp_fullTagList.push(sc_upmw_displayContainer_all[sc_upmw_i].postList[sc_upmw_iii].tagList[sc_upmw_iiii]);
                // Add tag button object to the display container
                sc_upmw_displayContainer_all[sc_upmw_i].tagButtons.push(
                  new sc_upmw_TagButtonObject(sc_upmw_displayContainer_all[sc_upmw_i].index,
                  sc_upmw_displayContainer_all[sc_upmw_i].postList[sc_upmw_iii].tagList[sc_upmw_iiii]));
              }
            }
          }
          
          // Sort tags as needed
          switch (sc_upmw_displaySetting_tagOrder) {
            case "alphaAsc":
              sc_upmw_displayContainer_all[sc_upmw_i].tagButtons.sort(sc_upmw_func_SortTags);
              break;
            case "alphaDesc":
              sc_upmw_displayContainer_all[sc_upmw_i].tagButtons.sort(sc_upmw_func_SortTags);
              sc_upmw_displayContainer_all[sc_upmw_i].tagButtons.reverse();
              break;
          }
          
          for(sc_upmw_iiii=0; sc_upmw_iiii < sc_upmw_displayContainer_all[sc_upmw_i].tagButtons.length; sc_upmw_iiii++) {
            // Add tag button object to the display container and give it text
            sc_upmw_displayContainer_all[sc_upmw_i].tagObject.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].tagButtons[sc_upmw_iiii].HTMLObject);
            sc_upmw_displayContainer_all[sc_upmw_i].tagButtons[sc_upmw_iiii].HTMLObject.innerText = sc_upmw_displayContainer_all[sc_upmw_i].tagButtons[sc_upmw_iiii].tagName;
            
            // Give button event listeners that update the tags and which posts are visible
            sc_upmw_func_TagButtonSetup(sc_upmw_displayContainer_all[sc_upmw_i].tagButtons[sc_upmw_iiii]);
          }
          
          // Add empty tag class if container has no tags
          if (sc_upmw_displayContainer_all[sc_upmw_i].tagButtons.length <= 0) {
            sc_upmw_displayContainer_all[sc_upmw_i].tagObject.classList.add(sc_upmw_containerClass_tagEmptyContainer);
          }
          
          break;
          
        case "date":
          sc_upmw_displayContainer_all[sc_upmw_i].HTMLObject.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].dateObject);
          sc_upmw_displayContainer_all[sc_upmw_i].dateObject.classList.add(sc_upmw_containerClass_dateContainer);
          
          // Add empty date class if container has no posts with dates (i.e. no posts)
          if (sc_upmw_displayContainer_all[sc_upmw_i].postList.length <= 0) {
            sc_upmw_displayContainer_all[sc_upmw_i].dateObject.classList.add(sc_upmw_containerClass_dateEmptyContainer);
          } else {
            // Add date button objects if there are dates and posts
            for (sc_upmw_iii=0; sc_upmw_iii<2; sc_upmw_iii++) {
              
              // Choose correct label
              let sc_upmw_temp_labelObject = document.createElement("label");
              if (sc_upmw_iii == 0) {sc_upmw_temp_labelObject.innerText = sc_upmw_displaySetting_minDateText;}
              else {sc_upmw_temp_labelObject.innerText = sc_upmw_displaySetting_maxDateText;}
              sc_upmw_temp_labelObject.htmlFor = "sc_upmw_dateInput_" + sc_upmw_iii + "_" + sc_upmw_displayContainer_all[sc_upmw_i].index;
              sc_upmw_displayContainer_all[sc_upmw_i].dateObject.appendChild(sc_upmw_temp_labelObject);
              
              // Add new date input element
              sc_upmw_displayContainer_all[sc_upmw_i].dateButtons[sc_upmw_iii] = new sc_upmw_DateButtonObject(sc_upmw_displayContainer_all[sc_upmw_i].index, sc_upmw_iii);
              sc_upmw_displayContainer_all[sc_upmw_i].dateObject.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].dateButtons[sc_upmw_iii].HTMLObject);
              sc_upmw_displayContainer_all[sc_upmw_i].dateButtons[sc_upmw_iii].HTMLObject.setAttribute("type", "date");
              sc_upmw_displayContainer_all[sc_upmw_i].dateButtons[sc_upmw_iii].HTMLObject.id = "sc_upmw_dateInput_" + sc_upmw_iii + "_" + sc_upmw_displayContainer_all[sc_upmw_i].index;
              
              // Add eventlisteners
              sc_upmw_func_DateButtonSetup(sc_upmw_displayContainer_all[sc_upmw_i].dateButtons[sc_upmw_iii]);
            }
          }
          
          break;
          
        case "search":
          sc_upmw_displayContainer_all[sc_upmw_i].HTMLObject.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].searchObject);
          sc_upmw_displayContainer_all[sc_upmw_i].searchObject.classList.add(sc_upmw_containerClass_searchContainer);
          
          // Add empty date class if container has no posts
          if (sc_upmw_displayContainer_all[sc_upmw_i].postList.length <= 0) {
            sc_upmw_displayContainer_all[sc_upmw_i].searchObject.classList.add(sc_upmw_containerClass_searchEmptyContainer);
          } else {
            // Add search bar HTML object and label
            sc_upmw_displayContainer_all[sc_upmw_i].searchObject.innerHTML += "<label for='sc_upmw_searchInput_" + sc_upmw_displayContainer_all[sc_upmw_i].index + "'>" + sc_upmw_displaySetting_searchText + "</label>";
            sc_upmw_displayContainer_all[sc_upmw_i].searchObject.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].searchBar);
            sc_upmw_displayContainer_all[sc_upmw_i].searchBar.id = "sc_upmw_searchInput_" + sc_upmw_displayContainer_all[sc_upmw_i].index;
            sc_upmw_displayContainer_all[sc_upmw_i].searchBar.placeholder = sc_upmw_displaySetting_searchPlaceholder;
            
            // Set up event listener
            sc_upmw_func_SearchBarSetup(sc_upmw_displayContainer_all[sc_upmw_i]);
          }
          
          // Add checkboxes
          if (sc_upmw_displaySetting_searchCategoryArray.length > 0 && sc_upmw_displaySetting_searchCategoryArray[0][1] && sc_upmw_displayContainer_all[sc_upmw_i].postList.length > 0) {
          
            // Add search options to container
            let sc_upmw_temp_searchOptionContainer = document.createElement("div");
            sc_upmw_displayContainer_all[sc_upmw_i].searchObject.appendChild(sc_upmw_temp_searchOptionContainer);
            sc_upmw_temp_searchOptionContainer.classList.add(sc_upmw_containerClass_searchOptionContainer);
            
            // Add each checkbox option
            for (sc_upmw_iii=0; sc_upmw_iii < sc_upmw_displaySetting_searchCategoryArray.length; sc_upmw_iii++) {
              let sc_upmw_temp_checkboxOption = new sc_upmw_searchOptionObject(sc_upmw_i, sc_upmw_displaySetting_searchCategoryArray[sc_upmw_iii][0]);
              sc_upmw_displayContainer_all[sc_upmw_i].searchOptions[sc_upmw_iii] = sc_upmw_temp_checkboxOption;
              sc_upmw_temp_checkboxOption.HTMLObject.setAttribute("type", "checkbox");
              let sc_upmw_temp_checkboxOptionLabel = document.createElement("label");
              
              // Add checkbox label
              sc_upmw_temp_searchOptionContainer.appendChild(sc_upmw_temp_checkboxOptionLabel);
              sc_upmw_temp_checkboxOptionLabel.innerText = sc_upmw_displaySetting_searchCategoryArray[sc_upmw_iii][1];
              sc_upmw_temp_checkboxOptionLabel.htmlFor = "sc_upmw_searchOption_" + sc_upmw_i + "_" +  sc_upmw_displaySetting_searchCategoryArray[sc_upmw_iii][0];
              
              // Add checkbox to search container
              sc_upmw_temp_checkboxOptionLabel.appendChild(sc_upmw_temp_checkboxOption.HTMLObject);
              sc_upmw_temp_checkboxOption.HTMLObject.id = "sc_upmw_searchOption_" + sc_upmw_i + "_" +  sc_upmw_displaySetting_searchCategoryArray[sc_upmw_iii][0];
              sc_upmw_temp_checkboxOption.HTMLObject.checked = true;
              
              // Add custom checkbox if custom is active
              if (sc_upmw_displaySetting_searchOptionCustom) {
                let sc_upmw_temp_optionCheckboxCustom = document.createElement("div");
                sc_upmw_temp_checkboxOptionLabel.appendChild(sc_upmw_temp_optionCheckboxCustom);
                sc_upmw_temp_optionCheckboxCustom.classList.add(sc_upmw_containerClass_searchOptionCustom);
                sc_upmw_temp_checkboxOption.HTMLObject.classList.add(sc_upmw_containerClass_searchOptionCustom + "_input");
              }
              
              // Add listener event
              sc_upmw_func_SearchOptionSetup(sc_upmw_temp_checkboxOption);
            }
          }
          break;
        
        case "sort":
          sc_upmw_displayContainer_all[sc_upmw_i].HTMLObject.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].sortContainer);
          sc_upmw_displayContainer_all[sc_upmw_i].sortContainer.classList.add(sc_upmw_containerClass_sortContainer);
          
          // Add empty date class if container has no posts
          if (sc_upmw_displayContainer_all[sc_upmw_i].postList.length <= 0) {
            sc_upmw_displayContainer_all[sc_upmw_i].sortContainer.classList.add(sc_upmw_containerClass_sortEmptyContainer);
          } else {
            // Add Label
            sc_upmw_displayContainer_all[sc_upmw_i].sortContainer.innerHTML += "<label for='sc_upmw_sortSelect_" + sc_upmw_displayContainer_all[sc_upmw_i].index + "'>" + sc_upmw_displaySetting_sortText + "</label>";
            
            // Add dropdown
            sc_upmw_displayContainer_all[sc_upmw_i].sortContainer.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].sortOrder);
            sc_upmw_displayContainer_all[sc_upmw_i].sortOrder.id = "sc_upmw_sortSelect_" + sc_upmw_displayContainer_all[sc_upmw_i].index;
            
            // Add options
            for (sc_upmw_iii=0; sc_upmw_iii < sc_upmw_displaySetting_sortArray.length; sc_upmw_iii++) {
              let sc_upmw_temp_option = document.createElement('option');
              sc_upmw_temp_option.value = sc_upmw_displaySetting_sortArray[sc_upmw_iii][0];
              sc_upmw_temp_option.text = sc_upmw_displaySetting_sortArray[sc_upmw_iii][1];
              sc_upmw_displayContainer_all[sc_upmw_i].sortOrder.add(sc_upmw_temp_option);
              // Set default dropdown option selection
              if (sc_upmw_displaySetting_sortOrder == sc_upmw_temp_option.value) {
                sc_upmw_displayContainer_all[sc_upmw_i].sortOrder.value = sc_upmw_temp_option.value;
              }
            }
            
            // Add eventlistener on change
            sc_upmw_func_SortSelectSetup(sc_upmw_displayContainer_all[sc_upmw_i]); 
          }
          break;
          
        case "nav":
          sc_upmw_displayContainer_all[sc_upmw_i].HTMLObject.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].navObject);
          sc_upmw_displayContainer_all[sc_upmw_i].navObject.classList.add(sc_upmw_containerClass_navContainer);
          
          // Add empty date class if container has no posts
          if (sc_upmw_displayContainer_all[sc_upmw_i].postList.length <= 0 || sc_upmw_displayContainer_all[sc_upmw_i].postPerPage == 0) {
            sc_upmw_displayContainer_all[sc_upmw_i].navObject.classList.add(sc_upmw_containerClass_navEmptyContainer);
          } else {
            // Set up 'next' and 'prev' buttons for post list navigation
            for (sc_upmw_iii=0; sc_upmw_iii<2; sc_upmw_iii++) {
              let sc_upmw_temp_postMoveAmount = sc_upmw_displayContainer_all[sc_upmw_i].postPerPage;
              if (sc_upmw_iii==0) {sc_upmw_temp_postMoveAmount = -sc_upmw_displayContainer_all[sc_upmw_i].postPerPage;}
              
              sc_upmw_displayContainer_all[sc_upmw_i].navButtons[sc_upmw_iii] = new sc_upmw_NavButtonObject(sc_upmw_displayContainer_all[sc_upmw_i].index, sc_upmw_temp_postMoveAmount);
              sc_upmw_displayContainer_all[sc_upmw_i].navObject.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].navButtons[sc_upmw_iii].HTMLObject);
              sc_upmw_displayContainer_all[sc_upmw_i].navButtons[sc_upmw_iii].HTMLObject.id = "sc_upmw_navButton_" + sc_upmw_iii + "_" + sc_upmw_displayContainer_all[sc_upmw_i].index;
              
              if (sc_upmw_iii==0) {
                sc_upmw_displayContainer_all[sc_upmw_i].navButtons[sc_upmw_iii].HTMLObject.innerText = sc_upmw_displaySetting_prevButtonText;
              }
              else {
                sc_upmw_displayContainer_all[sc_upmw_i].navButtons[sc_upmw_iii].HTMLObject.innerText = sc_upmw_displaySetting_nextButtonText;
              }
              
              // Add event listener
              sc_upmw_func_NavButtonSetup(sc_upmw_displayContainer_all[sc_upmw_i].navButtons[sc_upmw_iii]);
              
              // Disable buttons if needed for page navigation
              if (sc_upmw_displayContainer_all[sc_upmw_i].postVisIndex <= 0 && sc_upmw_displayContainer_all[sc_upmw_i].navButtons[sc_upmw_iii].postAmount < 0) {
                sc_upmw_displayContainer_all[sc_upmw_i].navButtons[sc_upmw_iii].HTMLObject.disabled = true;
              }
              if ((sc_upmw_displayContainer_all[sc_upmw_i].postVisIndex + sc_upmw_displayContainer_all[sc_upmw_i].postPerPage) >= sc_upmw_displayContainer_all[sc_upmw_i].postList.length && sc_upmw_displayContainer_all[sc_upmw_i].navButtons[sc_upmw_iii].postAmount > 0) {
                sc_upmw_displayContainer_all[sc_upmw_i].navButtons[sc_upmw_iii].HTMLObject.disabled = true;
              }
            }
            
            // Set up navigation buttons for the post list (i.e. 1-9 between prev and next)
            if (sc_upmw_displaySetting_showPageNumbers) {
              // Set up nav page number holding container
              let sc_upmw_temp_pageNumberHolder = document.createElement("div");
              sc_upmw_displayContainer_all[sc_upmw_i].navObject.insertBefore(sc_upmw_temp_pageNumberHolder, sc_upmw_displayContainer_all[sc_upmw_i].navButtons[1].HTMLObject);
              sc_upmw_temp_pageNumberHolder.classList.add(sc_upmw_containerClass_navPageNumber);
              
              // Set up buttons
              for (sc_upmw_iii=0; sc_upmw_iii < Math.ceil(sc_upmw_displayContainer_all[sc_upmw_i].postList.length / sc_upmw_displayContainer_all[sc_upmw_i].postPerPage); sc_upmw_iii++) {
                
                // Create page number button
                sc_upmw_displayContainer_all[sc_upmw_i].navPageButtons[sc_upmw_iii] = new sc_upmw_NavPageObject(sc_upmw_i, sc_upmw_iii * sc_upmw_displayContainer_all[sc_upmw_i].postPerPage);
                
                // Add to container and give classes
                sc_upmw_temp_pageNumberHolder.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].navPageButtons[sc_upmw_iii].HTMLObject);
                if (sc_upmw_displayContainer_all[sc_upmw_i].navPageButtons[sc_upmw_iii].postIndex == 0) {
                  sc_upmw_displayContainer_all[sc_upmw_i].navPageButtons[sc_upmw_iii].HTMLObject.classList.add(sc_upmw_containerClass_navCurrentPage);
                  sc_upmw_displayContainer_all[sc_upmw_i].navPageButtons[sc_upmw_iii].HTMLObject.disabled = true;
                }
                
                // Hide element if not allowed to be seen
                if (sc_upmw_displaySetting_showPageNumberAmount > 0 && sc_upmw_iii > Math.floor(sc_upmw_displaySetting_showPageNumberAmount/2)) {
                  sc_upmw_displayContainer_all[sc_upmw_i].navPageButtons[sc_upmw_iii].HTMLObject.style.display="none";
                }
                  
                // Give page number button internal text
                if (sc_upmw_displaySetting_showPageNumbersCustom) {
                  sc_upmw_displayContainer_all[sc_upmw_i].navPageButtons[sc_upmw_iii].HTMLObject.innerText = sc_upmw_displaySetting_customPageNumbers[sc_upmw_iii % sc_upmw_displaySetting_customPageNumbers.length];
                } else {
                  sc_upmw_displayContainer_all[sc_upmw_i].navPageButtons[sc_upmw_iii].HTMLObject.innerText = sc_upmw_iii + 1;
                }
                
                // Assign event listener
                sc_upmw_func_NavPageButtonSetup(sc_upmw_displayContainer_all[sc_upmw_i].navPageButtons[sc_upmw_iii]);
              }
            }
          }
          break;
          
        case "post":
          sc_upmw_displayContainer_all[sc_upmw_i].HTMLObject.appendChild(sc_upmw_displayContainer_all[sc_upmw_i].postObject);
          sc_upmw_displayContainer_all[sc_upmw_i].postObject.classList.add(sc_upmw_containerClass_postContainer);
    
          // Update visible posts
          sc_upmw_func_DisplayUpdate(sc_upmw_displayContainer_all[sc_upmw_i]);
          break;
      }
    }
  }
}


// Add event listener for tag buttons
function sc_upmw_func_TagButtonSetup(tagButton) {
  tagButton.HTMLObject.addEventListener("click", e => {
    // Reset CSS classes
    tagButton.HTMLObject.classList.remove(sc_upmw_containerClass_tagButtonIncluded);
    tagButton.HTMLObject.classList.remove(sc_upmw_containerClass_tagButtonExcluded);
    
    let sc_upmw_temp_tagIncIndex = sc_upmw_displayContainer_all[tagButton.displayIndex].tagInc.indexOf(tagButton.tagName);
    let sc_upmw_temp_tagExcIndex = sc_upmw_displayContainer_all[tagButton.displayIndex].tagExc.indexOf(tagButton.tagName);
    
    // Set tag status
    switch (tagButton.tagStatus) {
      case "neutral":
        // Swap to 'included'
        tagButton.HTMLObject.classList.add(sc_upmw_containerClass_tagButtonIncluded);
        tagButton.tagStatus = "included";
        // Add to included array, remove from excluded array
        if (sc_upmw_temp_tagIncIndex < 0) {sc_upmw_displayContainer_all[tagButton.displayIndex].tagInc.push(tagButton.tagName);}
        if (sc_upmw_temp_tagExcIndex >= 0) {sc_upmw_displayContainer_all[tagButton.displayIndex].tagExc.splice(sc_upmw_temp_tagExcIndex, 1)}
        break;
        
      case "included":
        // Swap to 'excluded'
        tagButton.HTMLObject.classList.add(sc_upmw_containerClass_tagButtonExcluded);
        tagButton.tagStatus = "excluded";
        if (sc_upmw_temp_tagIncIndex >= 0) {sc_upmw_displayContainer_all[tagButton.displayIndex].tagInc.splice(sc_upmw_temp_tagIncIndex, 1)}
        if (sc_upmw_temp_tagExcIndex < 0) {sc_upmw_displayContainer_all[tagButton.displayIndex].tagExc.push(tagButton.tagName);}
        break;
        
      case "excluded":
        // Swap to 'neutral'
        tagButton.tagStatus = "neutral";
        // Remove from included and excluded array
        if (sc_upmw_temp_tagIncIndex >= 0) {sc_upmw_displayContainer_all[tagButton.displayIndex].tagInc.splice(sc_upmw_temp_tagIncIndex, 1)}
        if (sc_upmw_temp_tagExcIndex >= 0) {sc_upmw_displayContainer_all[tagButton.displayIndex].tagExc.splice(sc_upmw_temp_tagExcIndex, 1)}
        break;
    }
  
    // Update visible posts
    sc_upmw_func_DisplayUpdate(sc_upmw_displayContainer_all[tagButton.displayIndex]);
  });
}


// Add event listener for date buttons
function sc_upmw_func_DateButtonSetup(dateObject) {
  // ADD RESTRICTIONS FOR 'IF MIN IS THIS DATE, MAX CAN'T BE BEFORE IT'
  dateObject.HTMLObject.addEventListener("change", e => {
  
    // Check if min or max, then apply any date limits
    switch (dateObject.position) {
      case 0:
        // Minimum date
        if (dateObject.HTMLObject.value) {
          sc_upmw_displayContainer_all[dateObject.displayIndex].dateButtons[1].HTMLObject.min = dateObject.HTMLObject.value;
        } else {sc_upmw_displayContainer_all[dateObject.displayIndex].dateButtons[1].HTMLObject.min = "0000-01-01";}
        break;
      case 1:
        // Maximum date
        if (dateObject.HTMLObject.value) {
          sc_upmw_displayContainer_all[dateObject.displayIndex].dateButtons[0].HTMLObject.max = dateObject.HTMLObject.value;
        } else {sc_upmw_displayContainer_all[dateObject.displayIndex].dateButtons[0].HTMLObject.max = "9999-12-31";}
        break;
    }
    
    // Update visible posts
    sc_upmw_func_DisplayUpdate(sc_upmw_displayContainer_all[dateObject.displayIndex]);
  });
}

// Add event listener for search bar
function sc_upmw_func_SearchBarSetup(displayContainer) {
  displayContainer.searchBar.addEventListener("keyup", e => sc_upmw_func_DisplayUpdate(displayContainer));
}

// Add event listener for search options
function sc_upmw_func_SearchOptionSetup(searchOption) {
  searchOption.HTMLObject.addEventListener("change", e => {
    if (sc_upmw_displayContainer_all[searchOption.displayIndex].searchBar.value) {
      sc_upmw_func_DisplayUpdate(sc_upmw_displayContainer_all[searchOption.displayIndex]);
    }
  });
}

// Add event listener for sort dropdown
function sc_upmw_func_SortSelectSetup(displayContainer) {
  displayContainer.sortOrder.addEventListener("change", e => {
    sc_upmw_displaySetting_sortOrder = displayContainer.sortOrder.value;
    sc_upmw_func_DisplayUpdate(displayContainer);
  });
}

// Add event listener for nav buttons
function sc_upmw_func_NavButtonSetup(navButton) {
  navButton.HTMLObject.addEventListener("click", e => {
    // Set display container
    let sc_upmw_temp_displayContainer = sc_upmw_displayContainer_all[navButton.displayIndex];
    
    // Remove class from page Number Button 
    if (sc_upmw_displaySetting_showPageNumbers) {
      sc_upmw_temp_displayContainer.navPageButtons[sc_upmw_temp_displayContainer.postVisIndex / sc_upmw_temp_displayContainer.postPerPage].HTMLObject.classList.remove(sc_upmw_containerClass_navCurrentPage);
      sc_upmw_temp_displayContainer.navPageButtons[sc_upmw_temp_displayContainer.postVisIndex / sc_upmw_temp_displayContainer.postPerPage].HTMLObject.disabled = false;
    }
    
    // Update display's postVisIndex
    sc_upmw_temp_displayContainer.postVisIndex += navButton.postAmount;
    
    // Check if button should be disabled based on total posts visible
    if (sc_upmw_temp_displayContainer.postVisIndex <= 0) {
      sc_upmw_temp_displayContainer.postVisIndex = 0; // Reset position in case of negative error
      sc_upmw_temp_displayContainer.navButtons[0].HTMLObject.disabled = true; // Disable previous button
    } else {sc_upmw_temp_displayContainer.navButtons[0].HTMLObject.disabled = false;} // Enable previous button
    
    if ((sc_upmw_temp_displayContainer.postVisIndex + sc_upmw_temp_displayContainer.postPerPage) >= sc_upmw_temp_displayContainer.postList.length) {
      sc_upmw_temp_displayContainer.navButtons[1].HTMLObject.disabled = true; // Disable next button
    } else {sc_upmw_temp_displayContainer.navButtons[1].HTMLObject.disabled = false;} // Enable next button
    
    // Add class to page Number Button 
    if (sc_upmw_displaySetting_showPageNumbers) {
      sc_upmw_temp_displayContainer.navPageButtons[sc_upmw_temp_displayContainer.postVisIndex / sc_upmw_temp_displayContainer.postPerPage].HTMLObject.classList.add(sc_upmw_containerClass_navCurrentPage);
      sc_upmw_temp_displayContainer.navPageButtons[sc_upmw_temp_displayContainer.postVisIndex / sc_upmw_temp_displayContainer.postPerPage].HTMLObject.disabled = true;
    }
    
    // Update visible posts
    sc_upmw_func_DisplayUpdate(sc_upmw_temp_displayContainer);
  });
}

// Add event listener for nav page buttons
function sc_upmw_func_NavPageButtonSetup(pageButton) {
  pageButton.HTMLObject.addEventListener("click", e => {
    // Set display container
    let sc_upmw_temp_displayContainer = sc_upmw_displayContainer_all[pageButton.displayIndex];
    
    // Remove class from page Number Button 
    sc_upmw_temp_displayContainer.navPageButtons[sc_upmw_temp_displayContainer.postVisIndex / sc_upmw_temp_displayContainer.postPerPage].HTMLObject.classList.remove(sc_upmw_containerClass_navCurrentPage);
    sc_upmw_temp_displayContainer.navPageButtons[sc_upmw_temp_displayContainer.postVisIndex / sc_upmw_temp_displayContainer.postPerPage].HTMLObject.disabled = false;
    
    // Update display's postVisIndex
    sc_upmw_temp_displayContainer.postVisIndex = pageButton.postIndex;
    
    // Add class to page Number Button 
    pageButton.HTMLObject.classList.add(sc_upmw_containerClass_navCurrentPage);
    pageButton.HTMLObject.disabled = true;
    
    // Check if buttons should be disabled based on total posts visible
    if (sc_upmw_temp_displayContainer.postVisIndex <= 0) {
      sc_upmw_temp_displayContainer.postVisIndex = 0; // Reset position in case of negative error
      sc_upmw_temp_displayContainer.navButtons[0].HTMLObject.disabled = true; // Disable previous button
    } else {sc_upmw_temp_displayContainer.navButtons[0].HTMLObject.disabled = false;} // Enable previous button
    
    if ((sc_upmw_temp_displayContainer.postVisIndex + sc_upmw_temp_displayContainer.postPerPage) >= sc_upmw_temp_displayContainer.postList.length) {
      sc_upmw_temp_displayContainer.navButtons[1].HTMLObject.disabled = true; // Disable next button
    } else {sc_upmw_temp_displayContainer.navButtons[1].HTMLObject.disabled = false;} // Enable next button
    
    // Update visible posts
    sc_upmw_func_DisplayUpdate(sc_upmw_temp_displayContainer);
  });
}



// --------------------------------------------- FORMAT FUNCTIONS ---------------------------------------------
function sc_upmw_func_FormatPostHTML(postObject, htmlGuide) {
  // Format the post's HTML guides so they can be added to the display containers
  let sc_upmw_htmlGuideArray = htmlGuide.split(";");
  let sc_upmw_htmlGuideString = "";
  
  for (sc_upmw_f=0; sc_upmw_f < sc_upmw_htmlGuideArray.length; sc_upmw_f++) {
    switch (sc_upmw_htmlGuideArray[sc_upmw_f]) {
      // Format containers inside post
      case "header":
        sc_upmw_htmlGuideString += "<div class='" + sc_upmw_displayStructure_class_header + "'>";
        break;
      case "body":
        sc_upmw_htmlGuideString += "<div class='" + sc_upmw_displayStructure_class_body + "'>";
        break;
      case "footer":
        sc_upmw_htmlGuideString += "<div class='" + sc_upmw_displayStructure_class_footer + "'>";
        break;
      case "divEnd":
        sc_upmw_htmlGuideString += "</div>";
        break;
      
      // Format elements inside container
      case "title":
        if (postObject.title != "") {sc_upmw_htmlGuideString += "<span class='" + sc_upmw_displayStructure_class_title + "'>" + postObject.title + "</span>";}
        break;
      case "datePost":
        if (postObject.datePostText != "") {sc_upmw_htmlGuideString += "<span class='" + sc_upmw_displayStructure_class_datePost + "'>" + postObject.datePostText + "</span>";}
        break;
      case "dateLink":
        if (postObject.dateLinkText != "") {sc_upmw_htmlGuideString += "<span class='" + sc_upmw_displayStructure_class_dateLink + "'>" + postObject.dateLinkText + "</span>";}
        break;
      case "author":
        if (postObject.author != "") {sc_upmw_htmlGuideString += "<span class='" + sc_upmw_displayStructure_class_author + "'>" + postObject.author + "</span>";}
        break;
      case "tags":
        if (postObject.tagList[0]) {
          sc_upmw_htmlGuideString += "<div class='" + sc_upmw_displayStructure_class_tags + "'>";
          for (sc_upmw_ft=0; sc_upmw_ft < postObject.tagList.length; sc_upmw_ft++) {
            sc_upmw_htmlGuideString += "<span class='" + sc_upmw_displayStructure_class_tagText + "'>" + postObject.tagList[sc_upmw_ft] + "</span>";
          }
          sc_upmw_htmlGuideString += "</div>";
        }
        break;
      case "description":
        if (postObject.desc != "") {sc_upmw_htmlGuideString += "<span class='" + sc_upmw_displayStructure_class_description + "'>" + postObject.desc + "</span>";}
        break;
      case "content":
        if (postObject.cont != "") {sc_upmw_htmlGuideString += "<div class='" + sc_upmw_displayStructure_class_content + "'>" + postObject.cont + "</div>";}
        break;
      case "titleImg":
        if (postObject.titleImg != "") {sc_upmw_htmlGuideString += `<img alt="` + postObject.titleImgAlt + `" class='` + sc_upmw_displayStructure_class_titleImage + "' src='" + postObject.titleImg + "'>";}
        break;
      case "thumbImg":
        if (postObject.thumbImg != "") {sc_upmw_htmlGuideString += `<img alt="` + postObject.thumbImgAlt + `" class='` + sc_upmw_displayStructure_class_thumbImage + "' src='" + postObject.thumbImg + "'>";}
        break;
      case "comments":
        if (postObject.comment != "") {sc_upmw_htmlGuideString += "<div class='" + sc_upmw_displayStructure_class_comments + "'>" + postObject.comment + "</div>";}
        break;
      case "links":
        if (postObject.links != "") {sc_upmw_htmlGuideString += "<div class='" + sc_upmw_displayStructure_class_links + "'>" + postObject.links + "</div>";}
        break;
      case "share":
        if (postObject.title != "") {sc_upmw_htmlGuideString += "<a href='" + window.location.href.split("#")[0] + "#" + postObject.url.split("/")[postObject.url.split("/").length-1].split(".txt")[0] + "' class='" + sc_upmw_displayStructure_class_share + "'>" + sc_upmw_displaySetting_postShareText + "</a>";}
        break;
    }
  }
  
  return sc_upmw_htmlGuideString;
}



// ---------------------------------------------- SORT FUNCTIONS ----------------------------------------------
function sc_upmw_func_SortTags(tagA, tagB) {
  // Sorts tag arrays
  return ('' + tagA.tagName).localeCompare(tagB.tagName);
}

function sc_upmw_func_SortPosts(postA, postB) {
  switch (sc_upmw_displaySetting_sortOrder) {
    case "chronoAsc":
      return postB.date - postA.date;
    case "chronoDesc":
      return postA.date - postB.date;
    case "alphaAsc":
      return ('' + postA.title).localeCompare(postB.title);
    case "alphaDesc":
      return (('' + postA.title).localeCompare(postB.title) * -1);
  }
  return 0;
}



// ----------------------------------------- DISPLAY CONTAINER UPDATE -----------------------------------------
function sc_upmw_func_DisplayUpdate(displayContainer) {
  // Updates the specific container provided, should not have to manage the other elements in the container
  
  if (displayContainer.postList.length <= 0) {
    // If a display has no posts, show an empty class node
    displayContainer.postObject.classList.add(sc_upmw_containerClass_postEmptyContainer);
    displayContainer.navObject.classList.add(sc_upmw_containerClass_navEmptyContainer);
  } else {
    // Add a loading node and then attempt to load the posts
    displayContainer.postObject.innerHTML = sc_upmw_displaySetting_loadContent;
    
    // Reset visible post list
    displayContainer.postVisible = [];
    
    // Organise posts based on search terms (tags, dates, etc)
    let sc_upmw_temp_displayPostPer = displayContainer.postPerPage;
    if (sc_upmw_temp_displayPostPer==0) {sc_upmw_temp_displayPostPer = displayContainer.postList.length;} // Show all if 0
    
    for (sc_upmw_y=0; sc_upmw_y < displayContainer.postList.length; sc_upmw_y++) {
      
      let sc_upmw_temp_postAllowed = true;
      
      // Check for exluded tags
      for (sc_upmw_yy=0; sc_upmw_yy < displayContainer.tagExc.length; sc_upmw_yy++) {
        if (displayContainer.postList[sc_upmw_y].tagList.includes(displayContainer.tagExc[sc_upmw_yy])) {sc_upmw_temp_postAllowed = false;}
      }
      
      // Check for included tags
      if (sc_upmw_temp_postAllowed) { for (sc_upmw_yy=0; sc_upmw_yy < displayContainer.tagInc.length; sc_upmw_yy++) {
        if (!displayContainer.postList[sc_upmw_y].tagList.includes(displayContainer.tagInc[sc_upmw_yy])) {sc_upmw_temp_postAllowed = false;}
      }}
      
      // Check for dates
      if (sc_upmw_temp_postAllowed && displayContainer.dateButtons[0]) {
        let sc_upmw_temp_dateCheck = new Date();
        if (displayContainer.dateButtons[0].HTMLObject.value) {
          sc_upmw_temp_dateCheck = displayContainer.dateButtons[0].HTMLObject.value.split("-");
          sc_upmw_temp_dateCheck = new Date(sc_upmw_temp_dateCheck[0], (parseInt(sc_upmw_temp_dateCheck[1])-1), sc_upmw_temp_dateCheck[2], 0, 0);
          if (displayContainer.postList[sc_upmw_y].date < sc_upmw_temp_dateCheck) {sc_upmw_temp_postAllowed = false;}
        }
        if (displayContainer.dateButtons[1].HTMLObject.value) {
          sc_upmw_temp_dateCheck = displayContainer.dateButtons[1].HTMLObject.value.split("-");
          sc_upmw_temp_dateCheck = new Date(sc_upmw_temp_dateCheck[0], (parseInt(sc_upmw_temp_dateCheck[1])-1), sc_upmw_temp_dateCheck[2], 0, 0);
          if (displayContainer.postList[sc_upmw_y].date > sc_upmw_temp_dateCheck) {sc_upmw_temp_postAllowed = false;}
        }
      }
      
      // Check via search terms
      if (sc_upmw_temp_postAllowed && displayContainer.searchBar.value) {
        // ADD OPTION TO PICK WHERE TO SEARCH: AUTHOR, CONTENT, ETC. HTML OBJECT WITH CHECKBOXES
        let sc_upmw_temp_searchFound = false;
        let sc_upmw_temp_regExTerm = new RegExp(displayContainer.searchBar.value, "i");
        // Search text-based variables based on checkbox options
        if (displayContainer.searchOptions.length > 0) {
          // If search options are available, check each search option
          for (sc_upmw_yy=0; sc_upmw_yy < displayContainer.searchOptions.length; sc_upmw_yy++) {
            if (displayContainer.searchOptions[sc_upmw_yy].HTMLObject.checked) {
              let sc_upmw_temp_postSearchProperty = displayContainer.postList[sc_upmw_y].title;
              switch (displayContainer.searchOptions[sc_upmw_yy].searchCategory) {
                case "title":
                  sc_upmw_temp_postSearchProperty = displayContainer.postList[sc_upmw_y].title; break;
                case "author":
                  sc_upmw_temp_postSearchProperty = displayContainer.postList[sc_upmw_y].author; break;
                case "desc":
                  sc_upmw_temp_postSearchProperty = displayContainer.postList[sc_upmw_y].desc; break;
                case "cont":
                  sc_upmw_temp_postSearchProperty = displayContainer.postList[sc_upmw_y].cont; break;
                case "titleImgAlt":
                  sc_upmw_temp_postSearchProperty = displayContainer.postList[sc_upmw_y].titleImgAlt; break;
                case "thumbImgAlt":
                  sc_upmw_temp_postSearchProperty = displayContainer.postList[sc_upmw_y].thumbImgAlt; break;
                case "links":
                  sc_upmw_temp_postSearchProperty = displayContainer.postList[sc_upmw_y].links; break;
              }
              
              if (sc_upmw_temp_postSearchProperty.search(sc_upmw_temp_regExTerm) >= 0) {
                sc_upmw_temp_searchFound = true;
                sc_upmw_yy = displayContainer.searchOptions.length;
              }
            }
          }
        } else {
          // Search all text-based variables of the post to find it
          if (displayContainer.postList[sc_upmw_y].title.search(sc_upmw_temp_regExTerm) >= 0) {sc_upmw_temp_searchFound = true;}
          if (displayContainer.postList[sc_upmw_y].author.search(sc_upmw_temp_regExTerm) >= 0) {sc_upmw_temp_searchFound = true;}
          if (displayContainer.postList[sc_upmw_y].desc.search(sc_upmw_temp_regExTerm) >= 0) {sc_upmw_temp_searchFound = true;}
          if (displayContainer.postList[sc_upmw_y].cont.search(sc_upmw_temp_regExTerm) >= 0) {sc_upmw_temp_searchFound = true;}
          if (displayContainer.postList[sc_upmw_y].titleImgAlt.search(sc_upmw_temp_regExTerm) >= 0) {sc_upmw_temp_searchFound = true;}
          if (displayContainer.postList[sc_upmw_y].thumbImgAlt.search(sc_upmw_temp_regExTerm) >= 0) {sc_upmw_temp_searchFound = true;}
          if (displayContainer.postList[sc_upmw_y].links.search(sc_upmw_temp_regExTerm) >= 0) {sc_upmw_temp_searchFound = true;}
        }
        // Remove post if no search terms match
        if (!sc_upmw_temp_searchFound) {sc_upmw_temp_postAllowed = false;}
      }
      
      // If true, add post to post visible array
      if (sc_upmw_temp_postAllowed) {displayContainer.postVisible.push(displayContainer.postList[sc_upmw_y])}
    }
    
    // Sort visible posts so original post list has the same order
    displayContainer.postVisible.sort(sc_upmw_func_SortPosts);
    
    // Reset postVisIndex if it's past the visible post amount
    while (displayContainer.postVisIndex > displayContainer.postVisible.length && displayContainer.postVisIndex > 0) {
      displayContainer.postVisIndex -= displayContainer.postPerPage;
    }
    
    // Check if next / prev buttons should be disabled based on total posts visible
    if (displayContainer.postVisIndex <= 0 && displayContainer.navButtons[0]) {
      displayContainer.postVisIndex = 0; // Reset position in case of negative error
      displayContainer.navButtons[0].HTMLObject.disabled = true; // Disable previous button
    } else if (displayContainer.navButtons[0]) {displayContainer.navButtons[0].HTMLObject.disabled = false;} // Enable previous button
    
    if ((displayContainer.postVisIndex + displayContainer.postPerPage) >= displayContainer.postVisible.length && displayContainer.navButtons[1]) {
      displayContainer.navButtons[1].HTMLObject.disabled = true; // Disable next button
    } else if (displayContainer.navButtons[1]) {displayContainer.navButtons[1].HTMLObject.disabled = false;} // Enable next button
  
    
    // Add posts to display container
    if (displayContainer.postVisible.length <= 0) {
      // If no posts are visible
      displayContainer.postObject.classList.add(sc_upmw_containerClass_postEmptyContainer);
      displayContainer.navObject.classList.add(sc_upmw_containerClass_navEmptyContainer);
    } else {
      // Format the page numbers if needed
      if (sc_upmw_displaySetting_showPageNumbers && displayContainer.postPerPage > 0 && displayContainer.navPageButtons[0]) {
        // Determine which page numbers should be hidden
        let sc_upmw_temp_navPageButton_range = [0,Math.ceil(displayContainer.postList.length / displayContainer.postPerPage)];
        if (displayContainer.postVisible.length > 0) {
          sc_upmw_temp_navPageButton_range[0] = Math.max(0, Math.floor(displayContainer.postVisIndex / displayContainer.postPerPage) - Math.floor(sc_upmw_displaySetting_showPageNumberAmount/2));
          sc_upmw_temp_navPageButton_range[1] = Math.min(Math.floor(displayContainer.postVisible.length / displayContainer.postPerPage), Math.ceil(displayContainer.postVisIndex / displayContainer.postPerPage) + Math.floor(sc_upmw_displaySetting_showPageNumberAmount/2));
        }
        
        for (sc_upmw_nb=0; sc_upmw_nb < displayContainer.navPageButtons.length; sc_upmw_nb++) {
          if (sc_upmw_nb < sc_upmw_temp_navPageButton_range[0] || sc_upmw_nb > sc_upmw_temp_navPageButton_range[1]) {
            displayContainer.navPageButtons[sc_upmw_nb].HTMLObject.style.display = "none";
          } else {
            displayContainer.navPageButtons[sc_upmw_nb].HTMLObject.style.removeProperty("display");
            if (displayContainer.navPageButtons[sc_upmw_nb].postIndex == displayContainer.postVisIndex) {
              displayContainer.navPageButtons[sc_upmw_nb].HTMLObject.classList.add(sc_upmw_containerClass_navCurrentPage);
              displayContainer.navPageButtons[sc_upmw_nb].HTMLObject.disabled = true;
            } else {
              displayContainer.navPageButtons[sc_upmw_nb].HTMLObject.classList.remove(sc_upmw_containerClass_navCurrentPage);
              displayContainer.navPageButtons[sc_upmw_nb].HTMLObject.disabled = false;
            }
          }
        }
      }
      
      // If posts are visible & fit in the page length, format them based on the display container
      displayContainer.postObject.classList.remove(sc_upmw_containerClass_postEmptyContainer);
      displayContainer.navObject.classList.remove(sc_upmw_containerClass_navEmptyContainer);
      for (sc_upmw_y = displayContainer.postVisIndex; sc_upmw_y < displayContainer.postVisible.length && sc_upmw_y < (displayContainer.postVisIndex + sc_upmw_temp_displayPostPer); sc_upmw_y++) {
        let sc_upmw_temp_postInternal = "";
        let sc_upmw_temp_postObject = displayContainer.postVisible[sc_upmw_y];
        
        // Pick which HTML guide to use based on the display container
        if (displayContainer.displayFormat == "full" && !sc_upmw_temp_postObject.scheduleEdit && sc_upmw_temp_postObject.redirect == "") {sc_upmw_temp_postInternal = sc_upmw_temp_postObject.postHTML;}
        else {
          switch (displayContainer.type) {
            case "archive":
              sc_upmw_temp_postInternal = sc_upmw_temp_postObject.linkHTML_archive;
              break;
            case "gallery":
              sc_upmw_temp_postInternal = sc_upmw_temp_postObject.linkHTML_gallery;
              break;
            case "highlight":
              sc_upmw_temp_postInternal = sc_upmw_temp_postObject.linkHTML_highlight;
              break;
          }
        }
        
        // Check which container to put them in based on displayFormat and scheduleEdit
        if (sc_upmw_temp_postObject.scheduleEdit) {
          // If scheduled, disable any clicking events and give it the _disabled suffix for a class
          sc_upmw_temp_postInternal = `<div class="` + sc_upmw_temp_postObject.classAdd.join(" ") + " " + sc_upmw_postClass_link + " " + sc_upmw_postClass_link + `_disabled">` + sc_upmw_temp_postInternal + `</div>`;
        } else if (sc_upmw_temp_postObject.redirect != "") {
          // If it has a redirect link, make clicking on it take the user to that link
          sc_upmw_temp_postInternal = `<button aria-label="Open website: `+ sc_upmw_temp_postObject.redirect + `" class="` + sc_upmw_postClass_link + " " + sc_upmw_postClass_link + `_redirect" onClick='window.location.href="` + sc_upmw_temp_postObject.redirect + `"'>` + sc_upmw_temp_postInternal + `</button>`;
        } else {
          // Based on the .displayFormat, show the post and add relevant event listeners
          if (displayContainer.displayFormat == "full") {
            sc_upmw_temp_postInternal = `<div class="` + sc_upmw_temp_postObject.classAdd.join(" ") + " " + sc_upmw_postClass_post + `" id="` + "post_" + sc_upmw_temp_postObject.index + "_" + displayContainer.index + "_" + sc_upmw_temp_postObject.title.replaceAll(" ", "_") + `">` + sc_upmw_temp_postInternal + `</div>`;
          }
          else if (displayContainer.displayFormat == "expand") {
            sc_upmw_temp_postInternal = `<div class="` + sc_upmw_temp_postObject.classAdd.join(" ") + " " + sc_upmw_postClass_link + " " + sc_upmw_postClass_link + `_expand" id="post_` + sc_upmw_temp_postObject.index + "_" + displayContainer.index + "_" + sc_upmw_temp_postObject.title.replaceAll(" ", "_") + `">` +
              sc_upmw_temp_postInternal + `<button aria-label="Expand Post: `+ sc_upmw_temp_postObject.title + `" class="` + sc_upmw_postClass_link + `_expandButton" onclick="sc_upmw_func_postInteract(` + displayContainer.index + `, ` + sc_upmw_y + `, '` + displayContainer.displayFormat + `', this.parentNode)"></button>` + 
              "</div>";
          }
          else {
            sc_upmw_temp_postInternal = `<button aria-label="Open Post: `+ sc_upmw_temp_postObject.title + `" class="` + sc_upmw_temp_postObject.classAdd.join(" ") + " " + sc_upmw_postClass_link + `" id="` + "post_" + sc_upmw_temp_postObject.index + "_" + displayContainer.index + "_" + sc_upmw_temp_postObject.title.replaceAll(" ", "_") + `"` +
              `onclick="sc_upmw_func_postInteract(` + displayContainer.index + `, ` + sc_upmw_y + `, '` + displayContainer.displayFormat + `', this)">`
              + sc_upmw_temp_postInternal + `</button>`;
          }
        }
        
        // Display post
        displayContainer.postObject.innerHTML += sc_upmw_temp_postInternal;
      }
    }
    
    // Remove loading text if all posts are loaded (i.e. code has executed)
    displayContainer.postObject.removeChild(displayContainer.postObject.children[0]);
  }
}



// ----------------------------------------- POST INTERACTION FUNCTION -----------------------------------------
let sc_upmw_postViewer_currentDisplay = 0;
let sc_upmw_postViewer_currentPost = 0;
let sc_upmw_postViewer_currentFormat = "";
let sc_upmw_postViewer_HTMLObject = "";

function sc_upmw_func_postInteract(displayContainerIndex, postVisibleIndex, postFormatType, HTMLObject) {
  let sc_upmw_temp_linkHTML = "";
  let sc_upmw_temp_postHTML = sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].postHTML;
  sc_upmw_postViewer_lastClicked = HTMLObject;
  
  // Clear post viewer classes
  sc_upmw_postViewer.className = "";
  // Give classes based on post
  if (sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].classAdd[0] != "") {
    for (sc_upmw_pc=0; sc_upmw_pc < sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].classAdd.length; sc_upmw_pc++) {
      sc_upmw_postViewer.classList.add(sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].classAdd[sc_upmw_pc]);
    }
  }
  
  // Set which link and post HTML guides should be used
  switch (sc_upmw_displayContainer_all[displayContainerIndex].type) {
    case "archive":
      sc_upmw_temp_linkHTML = sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].linkHTML_archive;
      break;
      
    case "gallery":
      sc_upmw_temp_linkHTML = sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].linkHTML_gallery;
      break;
      
    case "highlight":
      sc_upmw_temp_linkHTML = sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].linkHTML_highlight;
      break;
  }
  
  if (postFormatType == "expand") {
    // For expand buttons, find the right type and then see which way the toggle needs to shift
    if (HTMLObject.classList.contains(sc_upmw_postClass_link)) {
      HTMLObject.innerHTML = sc_upmw_temp_postHTML + `<button aria-label="Expand Post: `+ sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].title + `" class="` + sc_upmw_postClass_link + `_expandButton" onclick="sc_upmw_func_postInteract(` + displayContainerIndex + `, ` + postVisibleIndex + `, '` + sc_upmw_displayContainer_all[displayContainerIndex].displayFormat + `', this.parentNode)"></button>`;
      HTMLObject.classList.remove(sc_upmw_postClass_link);
      HTMLObject.classList.add(sc_upmw_postClass_post);
    } else {
      HTMLObject.innerHTML = sc_upmw_temp_linkHTML + `<button aria-label="Expand Post: `+ sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].title + `" class="` + sc_upmw_postClass_link + `_expandButton" onclick="sc_upmw_func_postInteract(` + displayContainerIndex + `, ` + postVisibleIndex + `, '` + sc_upmw_displayContainer_all[displayContainerIndex].displayFormat + `', this.parentNode)"></button>`;
      HTMLObject.classList.add(sc_upmw_postClass_link);
      HTMLObject.classList.remove(sc_upmw_postClass_post);
    }
  } else {
    // For link buttons, find the right type and then display it in the post viewer
    // Set up post viewer variables
    sc_upmw_postViewer.style.display = "block";
    window.location.href = window.location.href.split("#")[0] + "#" + sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].url.split("/")[sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].url.split("/").length-1].split(".txt")[0];
    sc_upmw_postViewer.focus();
    // Stop HTML document from scrolling while the post viewer is open
    document.body.style.overflow = "hidden";
    
    sc_upmw_postViewer_currentDisplay = displayContainerIndex;
    sc_upmw_postViewer_currentPost = postVisibleIndex;
    sc_upmw_postViewer_currentFormat = postFormatType;
    sc_upmw_postViewer_HTMLObject = HTMLObject;
    
    // Previous button 
    if (postVisibleIndex <= 0) {sc_upmw_postViewer_buttonPrev.disabled = true;} else {sc_upmw_postViewer_buttonPrev.disabled = false;}
    // Next button
    if (postVisibleIndex >= sc_upmw_displayContainer_all[displayContainerIndex].postVisible.length-1) {sc_upmw_postViewer_buttonNext.disabled = true;} else {sc_upmw_postViewer_buttonNext.disabled = false;}
    
    // Insert HTML into post fill on the post viewer
    sc_upmw_postViewer_postFill.className = "";
    sc_upmw_postViewer_postFill.innerHTML = "";
    
    if (sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].redirect != "") {
      // If it's a redirect post, show a link to where it redirects
      sc_upmw_postViewer_postFill.innerHTML = `<a href="` + sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].redirect + `">` + sc_upmw_temp_linkHTML + `</a>`;
      sc_upmw_postViewer_postFill.classList.add(sc_upmw_postDisplaySetting_postFullscreen_redirectClass);
    } else if (sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].scheduleEdit) {
      // If it's a scheduled post, hide the post information
      sc_upmw_postViewer_postFill.innerHTML = sc_upmw_temp_linkHTML;
      sc_upmw_postViewer_postFill.classList.add(sc_upmw_postDisplaySetting_postFullscreen_scheduledClass);
    } else {
      // Reset focus to the top of the post and then fill in post viewer information
      sc_upmw_postViewer_postFill.focus();
      sc_upmw_postViewer_postFill.innerHTML = sc_upmw_temp_postHTML;
      sc_upmw_postViewer.focus();
    }
    
    // Process any script elements
    sc_upmw_UserScriptProcessing(sc_upmw_postViewer_postFill, sc_upmw_displayContainer_all[displayContainerIndex].postVisible[postVisibleIndex].index);
  }
}



// -------------------------------- PROCESSING FUNCTION FOR SCRIPTS INSIDE POSTS --------------------------------
function sc_upmw_UserScriptProcessing(postElement, postID) {
  // Translates non-working script nodes into working script nodes, i.e. changing += innerhtml
  // Call this script whenever a post is displayed as a link or full post
  // Edited from: https://stackoverflow.com/questions/1197575/can-scripts-be-inserted-with-innerhtml
  if (postElement.tagName == 'SCRIPT') {
    postElement.parentNode.replaceChild(sc_upmw_UserScriptProcessing_ElementReplace(postElement, postID), postElement);
  } else {
    let sc_upmw_rc = -1;
    let sc_upmw_scriptChildren = postElement.childNodes;
    while (++sc_upmw_rc < sc_upmw_scriptChildren.length) {
      sc_upmw_UserScriptProcessing(sc_upmw_scriptChildren[sc_upmw_rc], postID);
    }
  }
}

function sc_upmw_UserScriptProcessing_ElementReplace(postElement, postID) {
  let sc_upmw_scriptElement = document.createElement("script");
  postElement.innerHTML = "/* Post information from: sc_upmw_postList[" + postID + "] */ " + postElement.innerHTML;
  sc_upmw_scriptElement.text = postElement.innerHTML;
  
  let sc_upmw_rc = -1;
  let sc_upmw_scriptAttr = postElement.attributes;
  let sc_upmw_scriptSetAttr;
  while (++sc_upmw_rc < sc_upmw_scriptAttr.length) {
    sc_upmw_scriptElement.setAttribute((sc_upmw_scriptSetAttr = sc_upmw_scriptAttr[sc_upmw_rc].name, sc_upmw_scriptSetAttr.value));
  }
  
  return sc_upmw_scriptElement;
}



// ----------------------------------------- IMAGE VALIDATION FUNCTION -----------------------------------------
// Used to validate image URLs inside post objects
let sc_upmw_func_imagesToValidate = 0;        // Total images
let sc_upmw_func_imageValidationCounter = 0;  // How many images have been validated
function sc_upmw_func_ImageValidator(sc_upmw_temp_postObject) {
  if (sc_upmw_temp_postObject.titleImg != "") {
    // Check title image URL
    let sc_upmw_tempImgTitle = new Image();
    sc_upmw_tempImgTitle.addEventListener('load', () => sc_upmw_func_imageValidationCounter+=1);
    sc_upmw_tempImgTitle.addEventListener('error', () => {
      console.log("Title image URL provided for " + sc_upmw_temp_postObject.url + " (" + sc_upmw_temp_postObject.titleImg + ") not valid, using default");
      sc_upmw_temp_postObject.titleImg = sc_upmw_postDefaultProperty_titleImg;
      sc_upmw_temp_postObject.titleImgAlt = sc_upmw_postDefaultProperty_titleImgAlt;
      sc_upmw_func_imageValidationCounter+=1;
    
      // Give the post the necessary HTML guide updates
      sc_upmw_temp_postObject.linkHTML_archive = sc_upmw_displayStructure_allLink;
      sc_upmw_temp_postObject.linkHTML_gallery = sc_upmw_displayStructure_allLink;
      sc_upmw_temp_postObject.linkHTML_highlight = sc_upmw_displayStructure_allLink;
      if (sc_upmw_displayStructure_archiveLink != "") {sc_upmw_temp_postObject.linkHTML_archive = sc_upmw_displayStructure_archiveLink;}
      if (sc_upmw_displayStructure_galleryLink != "") {sc_upmw_temp_postObject.linkHTML_gallery = sc_upmw_displayStructure_galleryLink;}
      if (sc_upmw_displayStructure_highlightLink != "") {sc_upmw_temp_postObject.linkHTML_highlight = sc_upmw_displayStructure_highlightLink;}
      
      //HTML guides for post display, gives a ";" split list of elements that changes into a HTML string
      sc_upmw_temp_postObject.postHTML = "header;" + sc_upmw_displayStructure_allPostHeader + ";divEnd;body;" +  sc_upmw_displayStructure_allPostBody + ";divEnd;footer;" + sc_upmw_displayStructure_allPostFooter + ";divEnd";
      
      sc_upmw_temp_postObject.linkHTML_archive = sc_upmw_func_FormatPostHTML(sc_upmw_temp_postObject, sc_upmw_temp_postObject.linkHTML_archive);
      sc_upmw_temp_postObject.linkHTML_gallery = sc_upmw_func_FormatPostHTML(sc_upmw_temp_postObject, sc_upmw_temp_postObject.linkHTML_gallery);
      sc_upmw_temp_postObject.linkHTML_highlight = sc_upmw_func_FormatPostHTML(sc_upmw_temp_postObject, sc_upmw_temp_postObject.linkHTML_highlight);
      sc_upmw_temp_postObject.postHTML = sc_upmw_func_FormatPostHTML(sc_upmw_temp_postObject, sc_upmw_temp_postObject.postHTML);
      
      // Update All
      for (sc_upmw_iv=0; sc_upmw_iv < sc_upmw_displayContainer_all.length; sc_upmw_iv++) {
        sc_upmw_func_DisplayUpdate(sc_upmw_displayContainer_all[sc_upmw_iv]);
      }
    });
    sc_upmw_tempImgTitle.src = sc_upmw_temp_postObject.titleImg;
  }
  
  if (sc_upmw_temp_postObject.thumbImg != "") {
    // Check thumb image URL
    let sc_upmw_tempImgThumb = new Image();
    sc_upmw_tempImgThumb.addEventListener('load', () => sc_upmw_func_imageValidationCounter+=1);
    sc_upmw_tempImgThumb.addEventListener('error', () => {
      console.log("Thumb image URL provided for " + sc_upmw_temp_postObject.url + " (" + sc_upmw_temp_postObject.thumbImg + ") not valid, using default");
      sc_upmw_temp_postObject.thumbImg = sc_upmw_postDefaultProperty_thumbImg;
      sc_upmw_temp_postObject.thumbImgAlt = sc_upmw_postDefaultProperty_thumbImgAlt;
      sc_upmw_func_imageValidationCounter+=1;
    
      // Give the post the necessary HTML guide updates
      sc_upmw_temp_postObject.linkHTML_archive = sc_upmw_displayStructure_allLink;
      sc_upmw_temp_postObject.linkHTML_gallery = sc_upmw_displayStructure_allLink;
      sc_upmw_temp_postObject.linkHTML_highlight = sc_upmw_displayStructure_allLink;
      if (sc_upmw_displayStructure_archiveLink != "") {sc_upmw_temp_postObject.linkHTML_archive = sc_upmw_displayStructure_archiveLink;}
      if (sc_upmw_displayStructure_galleryLink != "") {sc_upmw_temp_postObject.linkHTML_gallery = sc_upmw_displayStructure_galleryLink;}
      if (sc_upmw_displayStructure_highlightLink != "") {sc_upmw_temp_postObject.linkHTML_highlight = sc_upmw_displayStructure_highlightLink;}
      
      //HTML guides for post display, gives a ";" split list of elements that changes into a HTML string
      sc_upmw_temp_postObject.postHTML = "header;" + sc_upmw_displayStructure_allPostHeader + ";divEnd;body;" +  sc_upmw_displayStructure_allPostBody + ";divEnd;footer;" + sc_upmw_displayStructure_allPostFooter + ";divEnd";
      
      sc_upmw_temp_postObject.linkHTML_archive = sc_upmw_func_FormatPostHTML(sc_upmw_temp_postObject, sc_upmw_temp_postObject.linkHTML_archive);
      sc_upmw_temp_postObject.linkHTML_gallery = sc_upmw_func_FormatPostHTML(sc_upmw_temp_postObject, sc_upmw_temp_postObject.linkHTML_gallery);
      sc_upmw_temp_postObject.linkHTML_highlight = sc_upmw_func_FormatPostHTML(sc_upmw_temp_postObject, sc_upmw_temp_postObject.linkHTML_highlight);
      sc_upmw_temp_postObject.postHTML = sc_upmw_func_FormatPostHTML(sc_upmw_temp_postObject, sc_upmw_temp_postObject.postHTML);
      
      // Update All
      for (sc_upmw_iv=0; sc_upmw_iv < sc_upmw_displayContainer_all.length; sc_upmw_iv++) {
        sc_upmw_func_DisplayUpdate(sc_upmw_displayContainer_all[sc_upmw_iv]);
      }
    });
    sc_upmw_tempImgThumb.src = sc_upmw_temp_postObject.thumbImg;
  }
}



// ---------------------------------------------- FORMAT POST DATE ----------------------------------------------
function sc_upmw_func_FormatDate(sc_upmw_temp_dateToFormat, sc_upmw_temp_formattedDate) {
  
  // Replace YEAR in date formatting
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("YYYY", sc_upmw_temp_dateToFormat.getFullYear());
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("YY", sc_upmw_temp_dateToFormat.getFullYear().toString().substr(-2,2));
  
  // Replace MONTH in date formatting
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("MML", sc_upmw_varDefault_timeMonthLong[sc_upmw_temp_dateToFormat.getMonth()]);
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("MMS", sc_upmw_varDefault_timeMonthLong[sc_upmw_temp_dateToFormat.getMonth()].toString().substr(0,3));
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("MMZ", (sc_upmw_temp_dateToFormat.getMonth() + 1).toString().padStart(2,0));
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("MM", sc_upmw_temp_dateToFormat.getMonth() + 1);
  
  // Find date's suffix
  let sc_upmw_temp_daySuffix = "th";
  if (sc_upmw_temp_dateToFormat.getDate() >= 10 && sc_upmw_temp_dateToFormat.getDate() <= 19) {
    sc_upmw_temp_daySuffix = "th";  // Prevent 10-19 from receiving incorrect suffix
  } else if (sc_upmw_temp_dateToFormat.getDate().toString().endsWith("1")) {sc_upmw_temp_daySuffix="st";}
  else if (sc_upmw_temp_dateToFormat.getDate().toString().endsWith("2")) {sc_upmw_temp_daySuffix="nd";}
  else if (sc_upmw_temp_dateToFormat.getDate().toString().endsWith("3")) {sc_upmw_temp_daySuffix="rd";}
  
  // Replace DAY in date formatting
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("DDTH", sc_upmw_temp_dateToFormat.getDate() + sc_upmw_temp_daySuffix);
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("DDN", sc_upmw_varDefault_timeDayLong[sc_upmw_temp_dateToFormat.getDay()]);
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("DDS", sc_upmw_varDefault_timeDayLong[sc_upmw_temp_dateToFormat.getDay()].substr(0,3));
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("DDZ", sc_upmw_temp_dateToFormat.getDate().toString().padStart(2,0));
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("DD", sc_upmw_temp_dateToFormat.getDate());
  
  // Find date's 12hr equivalent and am/pm
  let sc_upmw_temp_hourTwelve = sc_upmw_temp_dateToFormat.getHours();
  let sc_upmw_temp_hourSuffix = "am";
  if (sc_upmw_temp_dateToFormat.getHours() > 12) {
    sc_upmw_temp_hourTwelve = sc_upmw_temp_dateToFormat.getHours() - 12;
    sc_upmw_temp_hourSuffix = "pm";
  } 
  else if (sc_upmw_temp_dateToFormat.getHours() == 12) {sc_upmw_temp_hourSuffix = "pm";} 
  else if (sc_upmw_temp_dateToFormat.getHours() == 0) {sc_upmw_temp_hourTwelve = 12;}
  
  // Replace HOUR in date formatting
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("HHSZ", sc_upmw_temp_hourTwelve.toString().padStart(2,0));
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("HHS", sc_upmw_temp_hourTwelve);
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("HHZ", sc_upmw_temp_dateToFormat.getHours().toString().padStart(2,0));
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("HH", sc_upmw_temp_dateToFormat.getHours());
  
  // replace MINUTE and Suffix in date formatting
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("MINZ", sc_upmw_temp_dateToFormat.getMinutes().toString().padStart(2,0));
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("MIN", sc_upmw_temp_dateToFormat.getMinutes());
  sc_upmw_temp_formattedDate = sc_upmw_temp_formattedDate.replaceAll("XM", sc_upmw_temp_hourSuffix);
  
  return sc_upmw_temp_formattedDate;
}



// ------------ BEGIN SCRIPT EXECUTION, TIMER FOR FILE COLLECTION, AND ERROR CATCHER FOR FILE FAULT ------------
// Start executing all code once the files are fetched correctly
let sc_upmw_timer_fileWait_failureCheck = 0; // If this is too high, cease timer to prevent useless running
let sc_upmw_timer_fileWait_postFinish = false; // true if post files are completed
let sc_upmw_timer_fileWait_control = setInterval(sc_upmw_timer_fileWait, 100);
function sc_upmw_timer_fileWait() {
  // Once the post list and format are collected, get the posts
  if (sc_upmw_txtFile_postList_string != "" && !sc_upmw_postList[0]) {
    console.log("Attempting to collect post text files");
    sc_upmw_timer_fileWait_failureCheck += 1;
    if(sc_upmw_timer_fileWait_failureCheck > 50) {
      console.log("Text file fetch function not executed in time, halting script");
      clearInterval(sc_upmw_timer_fileWait_control);
    }
    sc_upmw_func_PostGet();
  } 
  // When the post list, format, and all posts are collected, execute all code
  else if (sc_upmw_timer_fileWait_postFinish) {
    console.log("Post text files collected, extracting post information");
    clearInterval(sc_upmw_timer_fileWait_control);
    sc_upmw_func_PostFill();
  }
  else if(sc_upmw_timer_fileWait_failureCheck > 100) {
    console.log("Text file fetch function not executed in time, halting script");
    clearInterval(sc_upmw_timer_fileWait_control);
  }
  else {
    sc_upmw_timer_fileWait_failureCheck += 1;
    console.log("Loading Files...");
  }
  
  // Check if all the post txt files are collected
  if (!sc_upmw_timer_fileWait_postFinish && sc_upmw_postList[0]) {
    for (sc_upmw_iii = 0; sc_upmw_iii < sc_upmw_postList.length; sc_upmw_iii++) {
      // If the file has not received the raw data, exit this loop
      if (sc_upmw_postList[sc_upmw_iii].rawFile == "") {
        sc_upmw_timer_fileWait_postFinish = false;
        sc_upmw_iii = sc_upmw_postList.length + 1;
      }
      // If all posts have raw data, end the loop and timer
      else if (sc_upmw_iii == sc_upmw_postList.length - 1) {
        sc_upmw_timer_fileWait_postFinish = true;
      }
    }
  }
  
}








