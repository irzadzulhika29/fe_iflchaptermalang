import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBlogByAdmin,
  addCategoryBlogByAdmin,
  addCommentBlog,
  deleteBlogByAdmin,
  deleteCategoryBlogByAdmin,
  deleteComment,
  editBlogByAdmin,
  editCategoryBlogByAdmin,
  editComment,
  getAllBlogs,
  getAllCategoriesBlog,
  getAllCommentByIdBlog,
  getBlogBySlug,
  getCategoryBlogById,
  getCommentById,
  replyComment,
  toggleLikeBlog,
  toggleLikeComment,
} from "../hooks";

// blog categories
export const useGetAllCategoriesBlog = () => {
  return useQuery({
    queryKey: ["getAllCategoriesBlog"],
    queryFn: async () => {
      const responseGetAllCategoriesBlog = await getAllCategoriesBlog();
      return responseGetAllCategoriesBlog || "";
    },
  });
};

export const useGetCategoryBlogById = (categoryId) => {
  return useQuery({
    queryKey: ["getCategoryBlogById", categoryId],
    queryFn: async () => {
      const responseGetCategoryBlogById = await getCategoryBlogById(categoryId);
      return responseGetCategoryBlogById || "";
    },
  });
};

export const useAddCategoryBlogByAdmin = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseAddCategoryBlogByAdmin = addCategoryBlogByAdmin(body);
      return responseAddCategoryBlogByAdmin;
    },
  });
};

export const useEditCategoryBlogByAdmin = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseEditCategoryBlogByAdmin = editCategoryBlogByAdmin(body);
      return responseEditCategoryBlogByAdmin;
    },
  });
};

export const useDeleteCategoryBlogByAdmin = () => {
  return useMutation({
    mutationFn: (categoryId) => {
      const responseDeleteCategoryBlogByAdmin = deleteCategoryBlogByAdmin(categoryId);
      return responseDeleteCategoryBlogByAdmin;
    },
  });
};

// blog
export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ["getAllBlog"],
    queryFn: async () => {
      const responseGetAllBlog = await getAllBlogs();
      return responseGetAllBlog || "";
    },
  });
};

export const useGetBlogBySlug = (slugId) => {
  return useQuery({
    queryKey: ["getBlogBySlug", slugId],
    queryFn: async () => {
      const responseGetBlogBySlug = await getBlogBySlug(slugId);
      return responseGetBlogBySlug || "";
    },
  });
};

export const useAddBlogByAdmin = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseAddBlogByAdmin = addBlogByAdmin(body);
      return responseAddBlogByAdmin;
    },
  });
};

export const useEditBlogByAdmin = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseEditBlogByAdmin = editBlogByAdmin(body);
      return responseEditBlogByAdmin;
    },
  });
};

export const useDeleteBlogByAdmin = () => {
  return useMutation({
    mutationFn: (blogId) => {
      const responseDeleteBlogByAdmin = deleteBlogByAdmin(blogId);
      return responseDeleteBlogByAdmin;
    },
  });
};

export const useToggleLikeBlog = (blogId) => {
  return useMutation({
    mutationFn: () => {
      const responseToggleLikeBlog = toggleLikeBlog(blogId);
      return responseToggleLikeBlog;
    },
  });
};

export const useGetAllCommentByIdBlog = (blogId) => {
  return useQuery({
    queryKey: ["getAllCommentByIdBlog", blogId],
    queryFn: async () => {
      const responseGetAllCommentByIdBlog = await getAllCommentByIdBlog(blogId);
      return responseGetAllCommentByIdBlog || "";
    },
  });
};

export const useAddCommentBlog = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseAddCommentBlog = addCommentBlog(body);
      return responseAddCommentBlog;
    },
  });
};

export const useGetCommentById = (commentId) => {
  return useQuery({
    queryKey: ["getCommentById", commentId],
    queryFn: async () => {
      const responseGetCommentById = await getCommentById(commentId);
      return responseGetCommentById || "";
    },
  });
};

export const useEditComment = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseEditComment = editComment(body);
      return responseEditComment;
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (commentId) => {
      const responseDeleteComment = deleteComment(commentId);
      return responseDeleteComment;
    },
  });
};

export const useReplyComment = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseReplyComment = replyComment(body);
      return responseReplyComment;
    },
  });
};

export const useToggleLikeComment = (commentId) => {
  return useMutation({
    mutationFn: () => {
      const responseToggleLikeComment = toggleLikeComment(commentId);
      return responseToggleLikeComment;
    },
  });
};
