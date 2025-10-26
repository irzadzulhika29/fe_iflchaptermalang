import * as React from "react";

import { motion } from "framer-motion";

import {
  useAddCommentBlog,
  useDeleteComment,
  useEditComment,
  useGetAllCommentByIdBlog,
  useGetCommentById,
  useReplyComment,
  useToggleLikeComment,
} from "../../../features/blog";

import { users } from "../../../assets/icons";

import { CaretDown, ChatCircle, DotsThreeOutlineVertical, Heart, Pencil, ShareFat, ShareNetwork, Trash, X } from "@phosphor-icons/react";

import Container from "../../../components/container";
import Icon from "../../../components/icon";
import { Button } from "../../../components/button";
import Loading from "../../../components/loader";

import { formatDateAndTime } from "../../../utils/formatDate";
import { useGetProfile } from "../../../features/profile";

import SweatAlert from "../../../utils/sweet-alert";

const ActionButton = ({ value, text, icon, ...props }) => {
  const style = text === "Sukai" ? "-left-1" : text === "Komentar" ? "!-left-5" : "-left-3";
  return (
    <button className="relative group" {...props}>
      {icon}
      {text !== "Bagikan" && text && <p className="circle_number">{value ?? null}</p>}
      <p className={`hover_events ${style}`}>{text}</p>
    </button>
  );
};

const FormInput = ({ placeholder, commentRef, isPending, buttonClassName, onClose, ...props }) => {
  return (
    <>
      <textarea
        ref={commentRef}
        rows="2"
        className="block w-full p-2 my-2 overflow-hidden text-sm border-none outline-none resize-none text-dark-1"
        placeholder={placeholder}
        required
        {...props}
      />
      <div className={`flex gap-1 justify-end ${buttonClassName ?? ""}`}>
        {!placeholder && (
          <Button onClick={onClose} type="button" ariaLabel="cancel" size="small">
            Batal
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className={`${!placeholder && "w-full"}`}
          ariaLabel="send"
          size="small"
          intent={isPending ? "load" : "secondary"}
        >
          {isPending ? "Tunggu..." : "Kirim"}
        </Button>
      </div>
    </>
  );
};

const HeadComment = ({ comment, isLike, setReply, isReply, setEdit, userId, handleLikeButton, handleDeleteButton }) => {
  const [isDropdown, setDropdown] = React.useState(false);

  const { data } = useGetProfile();

  return (
    <div className="flex items-center justify-between pr-1">
      <div className="flex items-center gap-2">
        <Icon src={comment?.profile_picture || users} className="rounded-full" description="person" />
        <h4 className="text-sm font-semibold tracking-wide sm:text-base">{comment?.username}</h4>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative" onClick={() => setReply(!isReply)}>
          <ShareFat size={20} weight="bold" className="text-primary-1" />
        </button>
        <button className="relative" onClick={handleLikeButton}>
          <Heart size={20} weight={isLike && data ? "fill" : "bold"} className="text-primary-1" />
          <p className="circle_number !w-4 !h-4 !-top-1 !-right-1">{comment?.like ?? null}</p>
        </button>
        {data?.data?.id === userId && (
          <button className="relative" onClick={() => setDropdown(!isDropdown)}>
            <DotsThreeOutlineVertical size={20} weight="fill" className="text-primary-1" />
            {isDropdown && (
              <div className="absolute right-0 z-10 overflow-hidden text-xs font-medium border divide-y rounded-md top-8 bg-light-1 sm:text-sm text-dark-1">
                <li onClick={() => setEdit(true)} className="w-full px-2 py-0.5 flex items-center gap-1 hover:bg-primary-1/10">
                  <Pencil size={20} weight="fill" className="text-primary-1" /> Edit
                </li>
                <li onClick={handleDeleteButton} className="w-full px-2 py-0.5 flex items-center gap-1 hover:bg-red-500/10">
                  <Trash size={20} weight="fill" className="text-red-500" /> Hapus
                </li>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const CommentChild = ({ comment, refetch }) => {
  const [isEdit, setEdit] = React.useState(false);
  const [isReply, setReply] = React.useState(false);
  const [isLike, setLike] = React.useState(comment?.liked);

  const commentRef = React.useRef(null);

  const { data } = useGetCommentById(comment?.base_comment_id);

  const { mutate: reply } = useReplyComment();

  const { mutate: edit } = useEditComment();

  const { mutate: destroy } = useDeleteComment();

  const { mutate: toggleLikeComment } = useToggleLikeComment(comment?.id);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    reply({ blog_id: comment?.blog_id, comment_id: comment?.id, content: commentRef.current?.value });
    setReply(false);
    setTimeout(() => refetch(), 500);
  };

  const handleLikeButton = (e) => {
    e.preventDefault();
    toggleLikeComment();
    setLike(!isLike);
    setTimeout(() => refetch(), 500);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    edit({ blog_id: comment?.blog_id, comment_id: comment?.id, content: commentRef.current?.value });
    setTimeout(() => refetch(), 500);
    setEdit(false);
  };

  const handleDeleteButton = (e) => {
    e.preventDefault();
    destroy(comment?.id);
    setTimeout(() => refetch(), 500);
  };

  return (
    <>
      <div className="w-full space-y-2">
        <HeadComment
          userId={comment?.user_id}
          handleDeleteButton={handleDeleteButton}
          comment={comment}
          handleLikeButton={handleLikeButton}
          isLike={isLike}
          setEdit={setEdit}
          isReply={isReply}
          setReply={setReply}
        />
        {isEdit ? (
          <form onSubmit={handleEditSubmit} className="flex items-center pl-2">
            <FormInput buttonClassName="flex-col" onClose={() => setEdit(false)} commentRef={commentRef} defaultValue={`${comment?.content}`} />
          </form>
        ) : (
          <p className="pl-2 text-sm leading-4">
            <strong className="text-primary-1">@{data?.username || "anonymous"}</strong> {comment?.content}
          </p>
        )}
        {isReply && (
          <form onSubmit={handleReplySubmit} className="ml-4 border-l-2">
            <FormInput placeholder={`balas ke ${comment?.username}`} commentRef={commentRef} />
          </form>
        )}
      </div>
      <div className="w-full">
        <CommentListChild comments={comment?.replies} className={`py-1 ${!comment?.base_comment_id ? "ml-8" : ""}`} refetch={refetch} />
      </div>
    </>
  );
};

const CommentListChild = ({ comments, className, refetch }) => {
  return comments?.map((comment, index) => (
    <div key={index} className={`space-y-4 ${className ?? ""}`}>
      <CommentChild comment={comment} refetch={refetch} />
    </div>
  ));
};

const Comment = ({ comment, refetch }) => {
  const [isViewComment, setViewComment] = React.useState(false);
  const [isReply, setReply] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [isLike, setLike] = React.useState(comment?.liked);

  const commentRef = React.useRef(null);

  const { mutate } = useReplyComment();

  const { mutate: edit } = useEditComment();

  const { mutate: destroy } = useDeleteComment();

  const { mutate: toggleLikeComment } = useToggleLikeComment(comment?.id);

  const handleViewComment = (e) => {
    e.preventDefault();
    setViewComment(!isViewComment);
    setReply(false);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    mutate({ blog_id: comment?.blog_id, comment_id: comment?.id, content: commentRef.current?.value });
    setReply(false);
    setTimeout(() => refetch(), 500);
  };

  const handleLikeButton = (e) => {
    e.preventDefault();
    toggleLikeComment();
    setLike(!isLike);
    setTimeout(() => refetch(), 500);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    edit({ blog_id: comment?.blog_id, comment_id: comment?.id, content: commentRef.current?.value });
    setTimeout(() => refetch(), 500);
    setEdit(false);
  };

  const handleDeleteButton = (e) => {
    e.preventDefault();
    destroy(comment?.id);
    setTimeout(() => refetch(), 500);
  };

  return (
    <>
      <div className="w-full space-y-2">
        <HeadComment
          userId={comment?.user_id}
          comment={comment}
          handleDeleteButton={handleDeleteButton}
          handleLikeButton={handleLikeButton}
          isLike={isLike}
          setEdit={setEdit}
          isReply={isReply}
          setReply={setReply}
        />
        {isEdit ? (
          <form onSubmit={handleEditSubmit} className="flex items-center pl-2">
            <FormInput buttonClassName="flex-col" onClose={() => setEdit(false)} commentRef={commentRef} defaultValue={`${comment?.content}`} />
          </form>
        ) : (
          <p className="pl-2 text-sm leading-4">{comment?.content}</p>
        )}
        {comment?.replies?.length >= 1 && (
          <button className="block text-xs duration-300 ms-auto text-primary-1 hover:text-primary-2" onClick={handleViewComment}>
            {isViewComment ? "Sembunyikan balasan" : `Lihat semua balasan`}
          </button>
        )}
        {isReply && (
          <form onSubmit={handleReplySubmit} className="ml-4 border-l-2">
            <FormInput placeholder={`balas ke ${comment?.username}`} commentRef={commentRef} />
          </form>
        )}
      </div>
      <motion.div className="w-full overflow-hidden" animate={isViewComment ? { height: "fit-content" } : { height: 0 }}>
        <CommentListChild comments={comment?.replies} className="py-1 ml-8" refetch={refetch} />
      </motion.div>
    </>
  );
};

const CommentList = ({ comments, className, refetch }) => {
  return comments?.map((comment, index) => (
    <div key={index} className={`space-y-4 ${className ?? ""}`}>
      <Comment comment={comment} refetch={refetch} />
    </div>
  ));
};

const CommentModal = ({ id, dataUser, isModalComment, setModalComment, dataComments, isLoading, refetch }) => {
  const [isDropdown, setDropdown] = React.useState(false);

  const commentRef = React.useRef(null);

  const { mutate, isPending } = useAddCommentBlog();

  const handleSubmitComment = (e) => {
    e.preventDefault();
    mutate({ id, content: commentRef.current?.value });
    setTimeout(() => refetch(), 500);
    commentRef.current.value = "";
  };

  const animation = {
    open: { right: "16px", transition: { damping: 40 } },
    closed: { right: "-320px", transition: { damping: 40, delay: 0.15 } },
  };

  return (
    <motion.div variants={animation} animate={isModalComment ? "open" : "closed"} className="popup_comment">
      <div className="flex justify-between gap-4 px-4">
        <h3 className="text-lg font-semibold text-primary-1">Komentar ({dataComments?.total_comment})</h3>
        <button className="flex-shrink-0" onClick={() => setModalComment(!isModalComment)}>
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmitComment} className="mx-4 overflow-hidden border border-gray-400 rounded-2xl">
        <div className="flex items-center gap-2 p-2">
          <Icon src={dataUser?.data?.profile_picture || users} className="rounded-full" description="person" />
          <h4 className="text-sm font-semibold tracking-wide sm:text-base">{dataUser?.data?.username || "anonymous"}</h4>
        </div>
        <FormInput isPending={isPending} placeholder="apa yang anda pikirkan?" commentRef={commentRef} buttonClassName="p-2 border-t bg-gray-50" />
      </form>

      <button className="flex items-center gap-2 mx-4 font-semibold" onClick={() => setDropdown(!isDropdown)}>
        Lihat Komentar <CaretDown size={16} className={`${isDropdown && dataComments?.comment?.length && "rotate-180"} duration-300`} />
      </button>

      {isLoading ? (
        <Loading height={50} width={50} />
      ) : (
        <div className={`space-y-2 px-4 shadow-inner overflow-y-auto duration-300 comments ${isDropdown ? "max-h-0 py-0" : "max-h-40 py-4"}`}>
          {!dataComments?.replies?.length ? (
            <p className="m-8 text-sm text-center text-gray-400">Tidak ada komentar</p>
          ) : (
            <CommentList comments={dataComments?.replies} refetch={refetch} />
          )}
        </div>
      )}
    </motion.div>
  );
};

const SingleBlog = ({ blog, refetchBlog, toggleLikeButton }) => {
  const [isLike, setLike] = React.useState(blog?.liked);
  const [isModalComment, setModalComment] = React.useState(false);
  const [copyStatus, setCopyStatus] = React.useState(false);

  const { data: dataComments, isLoading, refetch: refetchComment } = useGetAllCommentByIdBlog(blog?.id);

  const { data: dataUser } = useGetProfile();

  const handleLikeButton = (e) => {
    e.preventDefault();
    toggleLikeButton();
    setLike(!isLike);
    setTimeout(() => refetchBlog(), 500);
  };

  const handleShareButton = async (e) => {
    e.preventDefault();
    setCopyStatus(true);
    await navigator.clipboard.writeText(window.location.href);
    setCopyStatus(false);
  };

  return (
    <Container key={blog?.id} className="leading-loose max-w-container-2 text-dark-1">
      <div className="pb-2 mb-4 space-y-6 tracking-wide border-b-4 border-b-gray-200">
        <menu className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">{blog?.title}</h1>
          <div className="flex items-center gap-4">
            <ActionButton
              value={blog?.like}
              onClick={handleLikeButton}
              text="Sukai"
              icon={<Heart size={36} weight={isLike && dataUser ? "fill" : "bold"} className="text-primary-1" />}
            />
            <ActionButton
              value={dataComments?.total_comment || 0}
              onClick={() => setModalComment(!isModalComment)}
              text="Komentar"
              icon={<ChatCircle size={32} weight="bold" className="text-primary-1" />}
            />
            <ActionButton text="Bagikan" onClick={handleShareButton} icon={<ShareNetwork size={32} weight="bold" className="text-primary-1" />} />
            {copyStatus && SweatAlert("Text copied to clipboard!", "success")}
            <CommentModal
              id={blog?.id}
              dataUser={dataUser}
              isModalComment={isModalComment}
              setModalComment={setModalComment}
              dataComments={dataComments}
              isLoading={isLoading}
              refetch={refetchComment}
            />
          </div>
        </menu>
        <menu className="flex flex-col justify-between sm:flex-row">
          <h2 className="text-base font-bold sm:text-lg">IFL Chapter Malang</h2>
          <p className="text-sm font-medium tracking-normal text-gray-500 sm:text-base">Published at : {formatDateAndTime(blog?.created_at)}</p>
        </menu>
      </div>
      <div className="dangerous_html" dangerouslySetInnerHTML={{ __html: blog?.content }} />
    </Container>
  );
};

export default SingleBlog;
