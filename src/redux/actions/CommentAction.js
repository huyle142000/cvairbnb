import { bothServiceToken } from "../../services/BothTokenService";
import { getCommentList, getStarComment } from "../reducer/CommentReducer";

export const getListCommentAPI = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.get("binh-luan");
      let arrFilter;

      arrFilter = await data.content.filter((phong) => {
        return phong.maPhong == id;
      });
      let totalCmt = 0;
      let starComment = arrFilter.reduce((total, cur, index) => {
        totalCmt += 1;
        return total + Number(cur.saoBinhLuan);
      }, 0);
      let convertStar = (Number(starComment) / Number(totalCmt)).toFixed(1);
      let comment = {
        total: totalCmt,
        star: Number(convertStar),
      };
      await dispatch(getStarComment(comment));
      await dispatch(getCommentList(arrFilter));
    } catch (error) {
      console.log(error.response);
    }
  };
};
