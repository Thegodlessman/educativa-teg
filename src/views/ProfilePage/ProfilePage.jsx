import React from "react";
import ClassList from "../../components/ClassList/ClassList.jsx";
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout.jsx";

import "./ProfilePage.css";

function ProfilePage() {
   return (
      <DashboardLayout>
         <ClassList />
      </DashboardLayout>
   );
}

export default ProfilePage;
