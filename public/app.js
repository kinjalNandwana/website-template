(function () {
  angular.module('app', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate', 'toaster'])

  angular.module('app')
   .config(['$routeProvider', '$locationProvider', RouteConfig])
   .controller('MainController', MainController)
   .controller('CoreController', CoreController)
   .controller('HomePageController', HomePageController)
   .controller('PropertiesListController', PropertiesListController)
   .controller('PropertyPageController', PropertyPageController)
   .controller('ContactPageController', ContactPageController)
   .directive('changeClassOnScroll', function ($window) {
    return {
      restrict: 'A',
      scope: {
        offset: "@",
        scrollClass: "@"
      },
      link: function (scope, element) {
        angular.element($window).bind("scroll", function () {
          if (this.pageYOffset >= parseInt(scope.offset)) {
            element.addClass(scope.scrollClass);
          } else {
            element.removeClass(scope.scrollClass);
          }
        });
      }
    };
  })
  .directive(
    "mAppLoading",
    function ($animate) {
      // Return the directive configuration.
      return ({
        link: link,
        restrict: "C"
      });
      // I bind the JavaScript events to the scope.
      function link(scope, element, attributes) {
        // Due to the way AngularJS prevents animation during the bootstrap
        // of the application, we can't animate the top-level container; but,
        // since we added "ngAnimateChildren", we can animated the inner
        // container during this phase.
        // --
        // NOTE: Am using .eq(1) so that we don't animate the Style block.
        $animate.leave(element.children().eq(1)).then(
          function cleanupAfterAnimation() {
            // Remove the root directive element.
            element.remove();
            // Clear the closed-over variable references.
            scope = element = attributes = null;
          }
        );
      }
    })
    .directive("owlCarousel", function() {
      return {
          restrict: 'E',
          transclude: false,
          link: function (scope, element, attrs) {
              scope.initCarousel = function() {
                  var defaultOptions = {
                  'navigation': true,
                  'pagination': false,
                  'loop': false,
                  'margin': 30,
                  'items' : 4,
                  'itemsDesktop' : [1199,4],
                  'itemsDesktopSmall' : [980,2],
                  'itemsTablet': [768,1],
                  'itemsMobile' : [479,1],
                  'stagePadding': 120,
                  'responsive': true,
                  'responsiveRefreshRate' : 200,
                  'responsiveBaseWidth': window,
                  // 'responsive': {
                  //     0: {
                  //         'items': 1
                  //     },
                  //     600: {
                  //         'items': 2,
                  //         'stagePadding': 30
                  //     },
                  //     900: {
                  //         'items': 3,
                  //         'stagePadding': 60
                  //     },
                  //     1200: {
                  //         'items': 3,
                  //         'stagePadding': 120
                  //     },
                  //     1600: {
                  //         'items': 4,
                  //         'stagePadding': 120
                  //     }
                  // },
                  'navigationText': [`<div class="pxp-props-carousel-left-arrow style="background-color:#fff"; pxp-animate">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32.414" height="20.828" viewBox="0 0 32.414 20.828" class="pxp-arrow-1">
                                      <g id="Group_30" data-name="Group 30" transform="translate(-1845.086 -1586.086)">
                                          <line id="Line_2" data-name="Line 2" x1="30" transform="translate(1846.5 1596.5)" fill="none" stroke="#333" stroke-linecap="round" stroke-width="2"/>
                                          <line id="Line_3" data-name="Line 3" x1="9" y2="9" transform="translate(1846.5 1587.5)" fill="none" stroke="#333" stroke-linecap="round" stroke-width="2"/>
                                          <line id="Line_4" data-name="Line 4" x1="9" y1="9" transform="translate(1846.5 1596.5)" fill="none" stroke="#333" stroke-linecap="round" stroke-width="2"/>
                                      </g>
                                  </svg>
                              </div>`,
                              `<div class="pxp-props-carousel-right-arrow pxp-animate">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32.414" height="20.828" viewBox="0 0 32.414 20.828">
                                      <g id="Symbol_1_1" data-name="Symbol 1 – 1" transform="translate(-1847.5 -1589.086)">
                                          <line id="Line_2" data-name="Line 2" x2="30" transform="translate(1848.5 1599.5)" fill="none" stroke="#333" stroke-linecap="round" stroke-width="2"/>
                                          <line id="Line_3" data-name="Line 3" x2="9" y2="9" transform="translate(1869.5 1590.5)" fill="none" stroke="#333" stroke-linecap="round" stroke-width="2"/>
                                          <line id="Line_4" data-name="Line 4" y1="9" x2="9" transform="translate(1869.5 1599.5)" fill="none" stroke="#333" stroke-linecap="round" stroke-width="2"/>
                                      </g>
                                  </svg>
                              </div>`],
                  'checkVisible': true,
                  'smartSpeed': 600,
                  'rewindNav' : false,
                  }
                  // init carousel
                  $(element).owlCarousel(defaultOptions);
              };
          }
      };
  })
  .directive('owlCarouselItem', [function() {
    return {
      restrict: 'A',
      transclude: false,
      link: function(scope, element) {
        // wait for the last item in the ng-repeat then call init
          if(scope.$last) {
              scope.initCarousel(element.parent());
          }
      }
  };
  }])
    .filter('capitalize', function () {
      'ngInject';
      return function (input) {
        return input ?
        input.replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str){ return str.toUpperCase()}) : '';
      };
    })

   function RouteConfig($routeProvider, $locationProvider) {
     'use strict';
     $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomePageController'
        })
        .when('/projects', {
          templateUrl: 'pages/properties.html',
          controller: 'PropertiesListController'
        })
        .when('/project/:projectId', {
            templateUrl: 'pages/single-property.html',
            controller: 'PropertyPageController'
        })
        .when('/contact-us', {
          templateUrl: 'pages/contact.html',
          controller: 'ContactPageController'
        })
        .when('/booking/create', {
          templateUrl: 'pages/single-property.html',
          controller: 'PropertyPageController'
        })
        .otherwise({
            redirectTo: '/'
          });

        $locationProvider.html5Mode(true);
   }

   function CoreController ($scope, $location, $http, $routeParams, toaster) {
    $scope.bookingDataForm = {};
    $scope.submitBookingForm = function () {
     $scope.progressBarLoading = true;
     $scope.bookingOverlayActive = true;
     $scope.projectId = $location.search().projectId;
     $scope.sharingType = $location.search().sharingType;
      $http({
        method: 'POST',
        url: `http://localhost:3020/shared-resource/search-discovery/search-project/booking?organization=5943d4efa3d24b443f4008a2&projectId=${$routeParams.projectId}&sharingType=${$scope.sharingType}`,
        data: {
          'bookingData': {
           'project': $scope.projectId,
          },
          'leadData': {
            'firstName': $scope.bookingDataForm.firstName,
            'lastName': $scope.bookingDataForm.lastName,
            'phoneNumber': $scope.bookingDataForm.phoneNumber,
            'countryCode': $scope.bookingDataForm.countryCode,
            'email': $scope.bookingDataForm.email,
            'dateOfMoveIn': $scope.bookingDataForm.dateOfMoveIn
          }
        }
      }).then((data) => {
        $scope.bookingDataForm = {};
        window.location.href = data.data.paymentLink;
        $('#bookingModal').modal('hide')
      }, function (response) {
        $scope.showFailureToast();
      }).finally(function() {
     })
    }

    $scope.showSuccessToast = function () {
      toaster.pop('success', "Success", "Your form has been submitted. We will get back to you.");
    }

    $scope.showFailureToast = function () {
      toaster.pop('error', "Error", "Please select sharing type first.");
    }

   }

   function MainController($scope, $controller) {
    $controller('CoreController', {
      $scope: $scope
    });
   }

   function HomePageController($scope, $controller, $location, $http, $window) {
    $controller('CoreController', {
      $scope: $scope
    });

    $scope.images = [
      'images/properties/prop-11-1-gallery.jpg',
      'images/properties/images-2.jpg',
      'images/properties/main-prop-3-gallery.jpg',
      'images/properties/1.jpg',
      'images/properties/images-3.jpg',
      'images/properties/images-4.jpg'
    ]
       $scope.projectId = '';
    $window.scroll(0,0);
       $http({
           method: 'GET',
           url: 'http://localhost:3020/shared-resource/search-discovery/search-project?organization=5943d4efa3d24b443f4008a2',
       }).then((response) => {
           $scope.projectList = response.data;

           $scope.projectList = $scope.projectList.splice(0,6);

           for (let i=0;i<$scope.projectList.length;i++) {
             $scope.projectList[i].image = $scope.images[i];
           }
       })

       $scope.routeTo = function () {
           $location.url(`/project/${$scope.projectId}`)
       }
   }

   function PropertyPageController($scope, $controller, $location, $http, $window, $routeParams) {

    $controller('CoreController', {
      $scope: $scope
    });
    $window.scroll(0,0);
    $scope.listingData = {}
    $scope.singleListingData = [];
    $scope.doubleListingData = [];
    $scope.tripleListingData = [];
    $scope.showSingleType = true;
    $scope.showDoubleType = false;
    $scope.showTripleType = false;
    $scope.bookType = 'Select'

    $scope.selection = 'single';

    $http({
        method: 'GET',
        url: `http://localhost:3020/shared-resource/search-discovery/search-project/${$routeParams.projectId}?organization=5943d4efa3d24b443f4008a2`,
    }).then((response) => {
        $scope.projectData = response.data;

        const { homesList = {} } = $scope.projectData || {};

        for (let i=0;i<homesList.length;i++) {

          let { listingObject = [] } = homesList[i]; 

          if (listingObject[0].sharingType && (listingObject[0].sharingType === 'single')) {
            listingObject[0].actualRentFromTenant = listingObject[0].actualRentFromTenant ? listingObject[0].actualRentFromTenant : 15000;
            $scope.singleListingData.push(listingObject[0]);
          }
          if (listingObject[0].sharingType && (listingObject[0].sharingType === 'double')) {
            listingObject[0].actualRentFromTenant = listingObject[0].actualRentFromTenant ? listingObject[0].actualRentFromTenant : 10000;
            $scope.doubleListingData.push(listingObject[0]);
          }
          if (listingObject[0].sharingType && (listingObject[0].sharingType === 'triple')) {
            listingObject[0].actualRentFromTenant = listingObject[0].actualRentFromTenant ? listingObject[0].actualRentFromTenant : 6000;
            $scope.tripleListingData.push(listingObject[0]);
          }
          $scope.idSelectedListing = null;
        }

        // $scope.filteredList = [...new Set($scope.tripleListingData.map(JSON.stringify))].map(JSON.parse);

        $scope.filteredList = [
          ...new Map($scope.tripleListingData.map(obj => [`${obj._id}:${obj.actualRentFromTenant}`, obj]))
          .values()
        ];

        $scope.selectListingType = function (listing) {
          $scope.bookType = 'Selected'
          $scope.idSelectedListing = listing._id;
          $scope.selectSharingType = true;
          $scope.listingData = listing;
          $scope.sharingType = $scope.listingData.sharingType;
        };
    }) 

    $scope.showSharingType = function (type) {
      if (type === 'singleType') {
        $scope.showSingleType = true;
        $scope.showDoubleType = false;
        $scope.showTripleType = false;
      } else if (type === 'doubleType') {
        $scope.showSingleType = false;
        $scope.showDoubleType = true;
        $scope.showTripleType = false;
      } else if (type === 'tripleType') {
        $scope.showSingleType = false;
        $scope.showDoubleType = false;
        $scope.showTripleType = true;
      }
    }

    $scope.storeBookingInfo = function () {
      if ($scope.sharingType) {
        $('#bookingModal').modal('show');
        $location.url(`/booking/create?projectId=${$routeParams.projectId}&sharingType=${$scope.sharingType}`)
      } else {
        $scope.showFailureToast();
      }
    }

   }

   function ContactPageController($scope) {
     $window.scroll(0,0);
   }

   function PropertiesListController ($scope, $controller, $window, $http) {
    $controller('CoreController', {
      $scope: $scope
    });
     $window.scroll(0,0);
     $scope.filterStatus = false;
     $scope.showFilters = function () {
       $scope.filterStatus = !$scope.filterStatus;
     }
     $http({
      method: 'GET',
      url: 'http://localhost:3020/shared-resource/search-discovery/search-project?organization=5943d4efa3d24b443f4008a2',
  }).then((response) => {
      $scope.projectList = response.data;
  })
   }

})();

