export default (routeName) => {
	return hideOnRoutes.includes(routeName);
};
const hideOnRoutes = ['RouteDetails', 'FollowRoute'];
