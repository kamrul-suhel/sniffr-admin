# Welcome to the API v1
![Welcome to the API version 1](../../application/api/v1/images/logo.png)

Welcome to version 1 alpha of the HelloVideo API. As of this writing the API v1 is not yet fully complete, there will be a few iterations of the API version 1 before it is deemed complete. 

In this document you will find out the basics on how to use the HelloVideo API.

# Videos

Currently there are 2 routes for getting the videos.

 - Getting all videos (api/v1/videos)
 - Getting a single video (api/video/{id})

### Getting all videos
The following request will retrieve the first 50 videos.
```
yoursite.com/api/v1/videos
```
If you would like to limit the results you can use the following query paremeters, which will give you video results starting from 21-30
```
yoursite.com/api/v1/videos?limit=10&offset=20
```

The default order for the videos is created_at in DESC order. You may choose to filter by a different column and order. As an example, say that you want to filter by the most views, you could get that by doing a get request to:
```
yoursite.com/api/v1/videos?filter=views&order=desc
```

You can use all of the query parameters together if you would like, as an example the following response will give us the videos with the most views starting at 10 and giving us the next 5 results. So we will get results 11-15 with the most views.
```
yoursite.com/api/v1/videos?filter=views&order=desc&limit=5&offset=10
```

Quick Note:
The Embed code and video files will be hidden when displaying all the video results. This will prevent any user from accessing any files they do not have access to.

### Getting a single video
The following request will get video where id is 1
```
yoursite.com/api/v1/video/1
```

Note: If the user Authenticated user has access to this video they will be able to view all the data from this video. If they do not have access to the video they will only see:

 - id
 - video_category_id
 - type
 - access
 - details
 - description
 - featured
 - duration
 - views
 - image
 - created_at
 - updated_at

# Video Categories

There are also 2 ways of getting video categories.

 - Getting all video categories (api/v1/video_categories)
 - Getting a single video category (api/video_category/{id})

### Getting all video categories

To get all the video categories you can simply make a get request to the following URL:

```
yoursite.com/api/v1/video_categories
```
### Getting a single video category

To get a single video category, you would use the following url, in this example we are getting video category where the id is 13:

```
yoursite.com/api/v1/video_category/13
```


# Posts

Posts works the same way as videos. There are 2 routes for getting the posts.

 - Getting all posts (api/v1/posts)
 - Getting a single post (api/post/{id})

### Getting all posts
The following request will retrieve the first 50 posts.
```
yoursite.com/api/v1/posts
```
If you would like to limit the results you can use the following query paremeters, which will give you post results starting from 21-30
```
yoursite.com/api/v1/posts?limit=10&offset=20
```

The default order for the posts is created_at in DESC order. You may choose to filter by a different column and order. As an example, say that you want to filter by the title, you could get that by doing a get request to:
```
yoursite.com/api/v1/videos?filter=title&order=asc
```

You can use all of the query parameters together if you would like, as an example the following response will give us the posts in order of title A-Z starting at 10 and giving us the next 5 results. So we will get results 11-15 in alphabetical order.
```
yoursite.com/api/v1/videos?filter=title&order=asc&limit=5&offset=10
```

Quick Note:
The Body will not be present when listing out all of the posts data to prevent users who do not have access to certain content.

### Getting a single post
The following request will get post where id is 1
```
yoursite.com/api/v1/post/1
```

Note: If the user Authenticated user has access to all the data in this post and they will be able to view all the data. If they do not have access to the post they will only see:

 - id
 - post_category_id
 - title
 - slug
 - image
 - body_guest
 - access
 - created_at
 - updated_at

# Post Categories

There are also 2 ways of getting post categories.

 - Getting all post categories (api/v1/post_categories)
 - Getting a single post category (api/post_category/{id})

### Getting all post categories

To get all the post categories you can simply make a get request to the following URL:

```
yoursite.com/api/v1/post_categories
```
### Getting a single post category

To get a single post category, you would use the following url, in this example we are getting post category where the id is 7:

```
yoursite.com/api/v1/post_category/7
```


