import API from "../../../libs/api";
import reloadPage from "../../../utils/reloadPage";
import SweatAlert from "../../../utils/sweet-alert";

// blog categories
export const getAllCategoriesBlog = async () => {
  return await API.get("/blog/category").then((response) => {
    return response.data?.data;
  });
};

export const getCategoryBlogById = async (categoryId) => {
  return await API.get(`/copywriter/blog/category/${categoryId}`).then((response) => {
    return response.data?.data;
  });
};

export const addCategoryBlogByAdmin = async (body) => {
  return await API.post("/copywriter/blog/category", body)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const editCategoryBlogByAdmin = async (body) => {
  return await API.put(`/copywriter/blog/category/${body?.id}`, body)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const deleteCategoryBlogByAdmin = async (categoryId) => {
  return await API.delete(`/copywriter/blog/category/${categoryId}`)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

// blog
export const getAllBlogs = async () => {
  return await API.get("/blog").then((response) => {
    return response.data?.data;
  });
};

export const getBlogBySlug = async (slugId) => {
  return await API.get(`/blog/${slugId}`).then((response) => {
    return response.data?.data;
  });
};

export const addBlogByAdmin = async (body) => {
  return await API.post("/copywriter/blog", body)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200, "/admin/dashboard/blog");
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const editBlogByAdmin = async (body) => {
  return await API.post(`/copywriter/blog/${body?.id}`, body, { headers: { "Content-Type": "multipart/form-data" } })
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200, "/admin/dashboard/blog");
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const deleteBlogByAdmin = async (blogId) => {
  return await API.delete(`/copywriter/blog/${blogId}`)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200, "/admin/dashboard/blog");
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const toggleLikeBlog = async (blogId) => {
  return await API.post(`/blog/${blogId}/toggle-like`)
    .then((response) => {
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const getAllCommentByIdBlog = async (blogId) => {
  return await API.get(`/blog/${blogId}/comment`).then((response) => {
    return response.data?.data;
  });
};

export const addCommentBlog = async (body) => {
  return await API.post(`/blog/${body?.id}/comment`, body)
    .then((response) => {
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const getCommentById = async (commentId) => {
  return await API.get(`/comment/${commentId}`).then((response) => {
    return response.data?.data;
  });
};

export const replyComment = async (body) => {
  return await API.post(`/blog/${body?.blog_id}/comment/${body.comment_id}`, body)
    .then((response) => {
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const editComment = async (body) => {
  return await API.put(`/blog/${body?.blog_id}/comment/${body.comment_id}`, body)
    .then((response) => {
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const deleteComment = async (commentId) => {
  return await API.delete(`/comment/${commentId}`)
    .then((response) => {
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const toggleLikeComment = async (commentId) => {
  return await API.post(`/comment/${commentId}/toggle-like`)
    .then((response) => {
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};
