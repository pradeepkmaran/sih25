
// TANGEDCO Electrical Complaint Management System - JavaScript

class ElectricalComplaintApp {
    constructor() {
        this.currentRole = 'local';
        this.currentPage = {
            local: 'localDashboard',
            department: 'deptAnalytics', 
            central: 'centralOverview'
        };
        this.charts = {};
        this.notifications = 3;
        this.liveUpdateInterval = null;
        
        // Electrical complaint data from the provided JSON
        // this.data = { }
        this.data = { 
            // complaints: [
            //     {
            //         id: "TNE2025001",
            //         title: "Street Light Not Working - Kalavakkam",
            //         description: "Street light pole number PB-45 on Kalavakkam main road has been non-functional for 4 days. LED bulb seems damaged. Causing safety issues for shoppers and pedestrians during evening hours.",
            //         location: "Kalavakkam, Thiruporur",
            //         coordinates: { lat: 13.0417, lng: 80.2343 },
            //         landmark: "Near Saravana Bhavan Restaurant",
            //         poleNumber: "PB-45",
            //         status: "Work Order Issued",
            //         priority: "High",
            //         category: "Street Light Maintenance",
            //         subCategory: "LED Bulb Replacement",
            //         department: "Thiruporur EB Office",
            //         reportedBy: "M. Rajesh",
            //         reporterPhone: "+91 9876543210",
            //         consumerNumber: "12304567890",
            //         createdDate: "2025-09-18T10:30:00Z",
            //         assignedTo: "AE Subramanian (Field Team-1)",
            //         workOrderNumber: "WO/TNE/2025/0045",
            //         estimatedCost: 450,
            //         images: ["streetlight_pondy1.jpg", "pole_pb45.jpg"],
            //         upvotes: 23,
            //         comments: 5,
            //         faultType: "Infrastructure",
            //         urgencyLevel: "Medium"
            //     },
            //     {
            //         id: "TNE2025002",
            //         title: "Frequent Power Cuts - Kelambakkam",
            //         description: "Experiencing 3-4 hour power cuts daily for the past week. Multiple households and shops affected. Transformer T-NG-15 seems to be overloading during peak hours.",
            //         location: "Kelambakkam, Thiruporur", 
            //         coordinates: { lat: 13.0428, lng: 80.2341 },
            //         landmark: "Near Naidu Hall",
            //         transformerNumber: "T-NG-15",
            //         status: "In Progress",
            //         priority: "Critical",
            //         category: "Power Supply Issue",
            //         subCategory: "Transformer Overload",
            //         department: "Thiruporur EB Office",
            //         reportedBy: "Shop Owners Association",
            //         reporterPhone: "+91 9123456789",
            //         createdDate: "2025-09-19T08:15:00Z",
            //         assignedTo: "AE Ramesh Kumar (Transformer Team)",
            //         workOrderNumber: "WO/TNE/2025/0046",
            //         estimatedCost: 15000,
            //         images: ["transformer_t_ng_15.jpg", "overload_damage.jpg"],
            //         upvotes: 67,
            //         comments: 18,
            //         faultType: "Equipment Failure",
            //         urgencyLevel: "High",
            //         affectedConsumers: 120
            //     },
            //     {
            //         id: "TNE2025003",
            //         title: "Meter Reading Error - Habibullah Road",
            //         description: "Electricity meter showing abnormally high consumption (1200 units) this month compared to usual 300 units. No change in usage pattern. Requesting meter testing.",
            //         location: "Habibullah Road, Thiruporur",
            //         coordinates: { lat: 13.0401, lng: 80.2298 },
            //         landmark: "Near Joyalukkas Showroom", 
            //         meterNumber: "HB4501234",
            //         status: "Verified",
            //         priority: "Medium",
            //         category: "Meter Related",
            //         subCategory: "Billing Dispute",
            //         department: "Thiruporur EB Office",
            //         reportedBy: "Mrs. Lakshmi Devi",
            //         reporterPhone: "+91 9876512345",
            //         consumerNumber: "45012340567",
            //         createdDate: "2025-09-20T14:20:00Z",
            //         assignedTo: "Meter Reader - Kumar",
            //         previousReading: 15240,
            //         currentReading: 16440,
            //         averageMonthlyUsage: 300,
            //         images: ["meter_hb4501234.jpg", "bill_comparison.jpg"],
            //         upvotes: 8,
            //         comments: 3,
            //         faultType: "Billing Issue",
            //         urgencyLevel: "Low"
            //     },
            //     {
            //         id: "TNE2025004", 
            //         title: "Voltage Fluctuation - Usman Road",
            //         description: "Severe voltage fluctuations causing damage to appliances. Voltage dropping to 180V during evening peak hours. Multiple complaints from nearby consumers.",
            //         location: "Usman Road, Thiruporur",
            //         coordinates: { lat: 13.0445, lng: 80.2387 },
            //         landmark: "Near Spencer Plaza",
            //         status: "Open",
            //         priority: "High", 
            //         category: "Power Quality",
            //         subCategory: "Voltage Fluctuation",
            //         department: "Thiruporur EB Office",
            //         reportedBy: "Apartment Association",
            //         reporterPhone: "+91 9234567890",
            //         createdDate: "2025-09-17T09:45:00Z",
            //         assignedTo: null,
            //         affectedArea: "Usman Road (200m stretch)",
            //         images: ["voltage_meter.jpg", "damaged_appliance.jpg"],
            //         upvotes: 45,
            //         comments: 12,
            //         faultType: "Power Quality",
            //         urgencyLevel: "High",
            //         affectedConsumers: 85
            //     },
            //     {
            //         id: "TNE2025005",
            //         title: "Cable Spark Near Bus Stop",
            //         description: "Overhead cable sparking near Thiruporur bus stop. Safety hazard for commuters. Cable insulation damaged due to tree branch contact.",
            //         location: "Thiruporur Bus Stop",
            //         coordinates: { lat: 13.0427, lng: 80.2345 },
            //         landmark: "Thiruporur Bus Terminus",
            //         status: "Resolved", 
            //         priority: "Emergency",
            //         category: "Safety Hazard",
            //         subCategory: "Cable Damage",
            //         department: "Thiruporur EB Office",
            //         reportedBy: "Bus Conductor - Murugan",
            //         reporterPhone: "+91 9345678901",
            //         createdDate: "2025-09-15T11:30:00Z",
            //         resolvedDate: "2025-09-15T16:45:00Z",
            //         assignedTo: "Emergency Response Team",
            //         workOrderNumber: "WO/TNE/2025/0044",
            //         images: ["cable_spark1.jpg", "cable_repaired.jpg", "safety_clearance.jpg"],
            //         upvotes: 92,
            //         comments: 21,
            //         faultType: "Safety Emergency",
            //         urgencyLevel: "Emergency",
            //         resolutionTime: "5 hours 15 minutes"
            //     },
            //     {
            //         id: "TNE2025006",
            //         title: "New Service Connection Request",
            //         description: "New commercial establishment requires 10KW 3-phase connection for textile showroom. All documents submitted, waiting for site inspection.",
            //         location: "GN Chetty Road, Thiruporur",
            //         coordinates: { lat: 13.0423, lng: 80.2378 },
            //         landmark: "Near Malar Hospital",
            //         status: "Inspection Scheduled",
            //         priority: "Medium",
            //         category: "Service Connection",
            //         subCategory: "New Connection",
            //         department: "Thiruporur EB Office",
            //         reportedBy: "K. Selvam - Business Owner",
            //         reporterPhone: "+91 9567890123",
            //         createdDate: "2025-09-16T10:00:00Z",
            //         assignedTo: "AE Inspection Team",
            //         requiredLoad: "10 KW",
            //         connectionType: "3-Phase Commercial",
            //         applicationNumber: "NC/TN/2025/0156",
            //         inspectionDate: "2025-09-23T10:00:00Z",
            //         images: ["shop_front.jpg", "documents.jpg"],
            //         upvotes: 3,
            //         comments: 1,
            //         faultType: "Service Request",
            //         urgencyLevel: "Low"
            //     }
            // ],
            staff: [
                {
                    name: "V. Subramanian",
                    designation: "Assistant Engineer/O&M",
                    department: "Thiruporur EB Office",
                    empId: "TNE001",
                    phone: "+91 9445850123",
                    email: "ae.thiruporur@tnebnet.org",
                    specialization: "Street Lighting & Distribution",
                    experience: "12 years",
                    currentAssignments: 8,
                    area: "Kalavakkam, Kelambakkam"
                },
                {
                    name: "R. Ramesh Kumar",
                    designation: "Assistant Engineer/Transformer",
                    department: "Thiruporur EB Office", 
                    empId: "TNE002",
                    phone: "+91 9445850124",
                    email: "ae.transformer.thiruporur@tnebnet.org",
                    specialization: "Transformer Maintenance",
                    experience: "15 years",
                    currentAssignments: 5,
                    area: "Usman Road, Habibullah Road"
                },
                {
                    name: "Dr. S. Muralidharan",
                    designation: "Superintending Engineer",
                    department: "Chennai EDC/Central",
                    empId: "CEC001",
                    phone: "+91 9445857001",
                    email: "se.chennaicentral@tnebnet.org",
                    specialization: "Distribution Circle Management",
                    experience: "22 years",
                    jurisdiction: "Central Chennai Circle",
                    officesUnder: 15
                }
            ],
            infrastructure: {
                tNagarArea: {
                    transformers: [
                        {"id": "T-NG-15", "location": "Kelambakkam", "capacity": "250 KVA", "status": "Overloaded"},
                        {"id": "T-NG-23", "location": "Kalavakkam", "capacity": "400 KVA", "status": "Normal"},
                        {"id": "T-NG-08", "location": "Usman Road", "capacity": "315 KVA", "status": "Maintenance Due"}
                    ],
                    streetLights: {
                        total: 245,
                        functional: 221,
                        needRepair: 24,
                        ledUpgraded: 180,
                        traditionalBulbs: 65
                    },
                    serviceConnections: {
                        domestic: 12450,
                        commercial: 2340,
                        industrial: 45,
                        streetLighting: 245
                    }
                }
            },
            performance: {
                tNagarOffice: {
                    monthlyComplaints: 186,
                    resolved: 164,
                    pending: 22,
                    avgResolutionTime: "18 hours",
                    customerSatisfaction: "91%",
                    emergencyResponseTime: "45 minutes"
                },
                chennaiEDC: {
                    totalComplaints: 2156,
                    resolved: 1987,
                    pending: 169,
                    avgResolutionTime: "1.8 days",
                    slaCompliance: "87%",
                    officesUnderJurisdiction: 15
                }
            },
            emergencyContacts: {
                focCenter: "1912",
                consumerCallCenter: "9498794987", 
                whatsappChennai: "9445850829",
                tNagarOffice: "044-2434-1101",
                emergencyRepair: "9445850811"
            }
        };

        this.init();
    }

    async fetchAllDataFromAPI() {
        try {
            // Complaints
            const complaintsRes = await fetch('https://sih25-api.vercel.app/api/complaints');
            if (!complaintsRes.ok) throw new Error('Failed to fetch complaints');
            this.data.complaints = await complaintsRes.json();

            // Staff
            // const staffRes = await fetch('https://sih25-api.vercel.app/api/staff');
            // if (staffRes.ok) {
            //     this.data.staff = await staffRes.json();
            // }

            // // Infrastructure
            // const infraRes = await fetch('https://sih25-api.vercel.app/api/infrastructure');
            // if (infraRes.ok) {
            //     this.data.infrastructure = await infraRes.json();
            // }

            // // Performance
            // const perfRes = await fetch('https://sih25-api.vercel.app/api/performance');
            // if (perfRes.ok) {
            //     this.data.performance = await perfRes.json();
            // }

            // // Emergency Contacts
            // const contactsRes = await fetch('https://sih25-api.vercel.app/api/emergencyContacts');
            // if (contactsRes.ok) {
            //     this.data.emergencyContacts = await contactsRes.json();
            // }

            // Work Orders
            const workOrdersRes = await fetch('https://sih25-api.vercel.app/api/workorders');
            if (workOrdersRes.ok) {
                this.data.workOrders = await workOrdersRes.json();
            }

            // Re-render UI with new data
            this.updateDashboardStats();
            this.renderPriorityComplaints();
            this.renderRecentActivity();
            this.renderElectricalComplaints();
            this.populateWorkOrdersTable();
            this.updateFieldStats();
            this.updateRoleSpecificData();
            this.setupElectricalCharts();

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderRecentActivity() {
        const sorted = this.data.workOrders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);

        const activityList = document.querySelector('.recent-activity .activity-list');
        activityList.innerHTML = '';

        sorted.forEach(order => {
            let icon = 'fa-check-circle activity-icon success';
            if (order.priority === 'Critical') icon = 'fa-bolt activity-icon danger';
            else if (order.priority === 'High') icon = 'fa-exclamation-triangle activity-icon warning';
            else if (order.status === 'In Progress') icon = 'fa-wrench activity-icon warning';
            else if (order.status === 'Assigned') icon = 'fa-user-plus activity-icon info';

            const timeAgo = order.createdAt
                ? `${Math.floor((Date.now() - new Date(order.createdAt)) / 3600000)} hours ago`
                : '';

            activityList.innerHTML += `
                <div class="activity-item">
                    <i class="fas ${icon}"></i>
                    <div class="activity-content">
                        <p>${order.task || ''} - ${order.location || ''}</p>
                        <span class="activity-time">${timeAgo}</span>
                    </div>
                </div>
            `;
        });
    }


    renderPriorityComplaints(branchId = '68d3b2f46b618379b9d88bed') {
        const priorityOrder = { 'Emergency': 4, 'Critical': 3, 'High': 2, 'Medium': 1, 'Low': 0 };

        const filtered = this.data.complaints
            .filter(c => c.status !== 'Resolved' && c.branch === branchId)
            .sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0))
            .slice(0, 3);

        const tbody = document.querySelector('#priorityComplaints tbody');
        tbody.innerHTML = '';

        filtered.forEach(c => {
            const tr = document.createElement('tr');
            tr.className = `complaint-row priority-${(c.priority || '').toLowerCase()}`;
            tr.innerHTML = `
                <td class="complaint-id">${c.complaintId || ''}</td>
                <td class="complaint-issue">
                    <strong>${c.title || ''}</strong>
                    <br><small>${c.description || ''}</small>
                </td>
                <td>
                    <i class="fas fa-map-marker-alt"></i> ${c.location || ''}
                    <br><small>${c.timeAgo || ''}</small>
                </td>
                <td><span class="priority-badge ${(c.priority || '').toLowerCase()}">${c.priority || ''}</span></td>
                <td><span class="status status--${(c.status || '').toLowerCase().replace(/\\s/g, '-') }">${c.status || ''}</span></td>
                <td class="work-order">${c.workOrderNumber || ''}</td>
                <td>
                    <button class="btn btn--sm btn--primary">Update</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    updateDashboardStats(branchId = '68d3b2f46b618379b9d88bed') {
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length >= 4) {
            stats[0].textContent = this.data.complaints.filter(c => c.priority === 'Critical' && c.branch===branchId).length;
            stats[1].textContent = this.data.complaints.filter(c => c.priority === 'High' && c.branch===branchId).length;
            stats[2].textContent = this.data.complaints.filter(c => c.workOrderNumber && c.branch===branchId).length;
            stats[3].textContent = this.data.complaints.filter(c => c.status === 'Pending' && c.branch===branchId).length;
        }
    }


    updateFieldStats() {
        try {
            const workOrders = this.data.workOrders || [];

            const activeCount = workOrders.filter(w => w.status === 'Open' || w.status === 'In Progress').length;
            const emergencyCount = workOrders.filter(w => w.priority === 'Critical').length;
            const todayCount = workOrders.filter(w => {
                const today = new Date();
                const created = new Date(w.createdAt);
                return created.toDateString() === today.toDateString();
            }).length;

            document.getElementById('activeWorkOrders').textContent = activeCount;
            document.getElementById('emergencyCalls').textContent = emergencyCount;
            document.getElementById('scheduledToday').textContent = todayCount;
        } catch (e) {
            console.error('Failed to update field stats', e);
        }
    }


    populateWorkOrdersTable() {
        try {
            const workOrders = this.data.workOrders || [];

            const tbody = document.getElementById('work-order-table');
            tbody.innerHTML = ''; 

            workOrders.forEach(order => {
                const tr = document.createElement('tr');
                tr.className = `work-order-row ${order.priority?.toLowerCase() || ''}`;
                tr.innerHTML = `
                    <td class="work-order-id">${order.workOrderId || ''}</td>
                    <td class="work-order-task">
                        <strong>${order.task || ''}</strong>
                        <br><small>${order.details || ''}</small>
                    </td>
                    <td>${order.assignedTo || ''}</td>
                    <td><span class="priority-badge ${order.priority?.toLowerCase() || ''}">${order.priority || ''}</span></td>
                    <td><span class="status status--${(order.status || '').toLowerCase().replace(/\s/g, '-') }">${order.status || ''}</span></td>
                    <td>
                        <button class="btn btn--sm btn--primary">Update</button>
                        <button class="btn btn--sm btn--outline">Details</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error loading work orders:', error);
        }
    }

    init() {
        this.fetchAllDataFromAPI();
        
        this.setupEventListeners();
        this.updateHeader();
        this.startRealTimeUpdates();
        
        setTimeout(() => {
            this.setupElectricalCharts();
        }, 500);
        
        this.showRoleSwitcher();
        
        console.log('TANGEDCO Electrical Complaint Management System initialized');
    }

    showRoleSwitcher() {
        const roleSwitcher = document.getElementById('roleSwitcher');
        if (roleSwitcher) {
            roleSwitcher.style.display = 'block';
            roleSwitcher.style.opacity = '1';
        }
    }

    setupEventListeners() {
        // Role switcher
        const roleSelect = document.getElementById('roleSelect');
        if (roleSelect) {
            roleSelect.addEventListener('change', (e) => {
                this.switchRole(e.target.value);
            });
        }

        // Global click handler with event delegation
        document.addEventListener('click', (e) => {
            this.handleGlobalClick(e);
        });
        
        // Search functionality
        const searchInput = document.getElementById('complaintSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterElectricalComplaints(e.target.value);
            });
        }

        // Filter functionality
        const categoryFilter = document.getElementById('categoryFilter');
        const statusFilter = document.getElementById('statusFilter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.applyElectricalFilters());
        }
        
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.applyElectricalFilters());
        }

        // Settings toggles
        document.addEventListener('change', (e) => {
            if (e.target.matches('.toggle input')) {
                this.handleElectricalSetting(e.target);
            }
        });

        // Keyboard shortcuts for electrical emergency
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.showEmergencyPanel();
            }
        });
    }

    handleGlobalClick(e) {
        // Navigation items
        if (e.target.closest('.nav-item')) {
            const navItem = e.target.closest('.nav-item');
            const page = navItem.dataset.page;
            if (page) {
                e.preventDefault();
                this.navigateToPage(page);
            }
            return;
        }

        // Complaint cards
        if (e.target.closest('.complaint-card')) {
            const card = e.target.closest('.complaint-card');
            const complaintId = this.getComplaintIdFromCard(card);
            if (complaintId && !e.target.closest('.btn')) {
                this.showElectricalComplaintDetails(complaintId);
            }
            return;
        }

        // Work order cards
        if (e.target.closest('.work-order-card')) {
            const card = e.target.closest('.work-order-card');
            const workOrderId = card.querySelector('.work-order-id')?.textContent;
            if (workOrderId && !e.target.closest('.btn')) {
                this.showWorkOrderDetails(workOrderId);
            }
            return;
        }

        // Tab buttons
        if (e.target.closest('.tab-btn')) {
            const button = e.target.closest('.tab-btn');
            this.switchTab(button);
            return;
        }

        // Button clicks
        if (e.target.closest('.btn')) {
            const button = e.target.closest('.btn');
            this.handleElectricalButtonClick(button, e);
            return;
        }

        // Emergency banner
        if (e.target.closest('.emergency-banner')) {
            this.showEmergencyContacts();
            return;
        }

        // Notification button
        if (e.target.closest('#notificationBtn')) {
            this.showElectricalNotifications();
            return;
        }

        // Office items
        if (e.target.closest('.office-item')) {
            const officeName = e.target.closest('.office-item').querySelector('.office-name').textContent;
            this.showOfficeDetails(officeName);
            return;
        }

        // Infrastructure items
        if (e.target.closest('.infra-item')) {
            const infraType = e.target.closest('.infra-item').querySelector('.infra-name').textContent;
            this.showInfrastructureDetails(infraType);
            return;
        }
    }

    getComplaintIdFromCard(card) {
        // Try to get complaint ID from various possible sources
        const idElement = card.querySelector('.complaint-id');
        if (idElement) {
            return idElement.textContent.trim();
        }
        
        // Fallback to data attribute if available
        return card.dataset.complaintId;
    }

    switchRole(role) {
        console.log(`Switching to role: ${role}`);
        this.currentRole = role;
        
        // Hide all views and nav items
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.querySelectorAll('.nav-items').forEach(nav => {
            nav.classList.remove('active');
        });
        
        // Show selected view and nav
        const targetView = document.getElementById(`${role}View`);
        const targetNav = document.getElementById(`${role}Nav`);
        
        if (targetView) {
            targetView.classList.add('active');
        }
        
        if (targetNav) {
            targetNav.classList.add('active');
        }
        
        // Update header for electrical context
        this.updateElectricalHeader();
        
        // Navigate to default page for this role
        this.navigateToPage(this.currentPage[role]);
        
        // Setup role-specific features
        setTimeout(() => {
            this.setupElectricalCharts();
            this.updateRoleSpecificData();
        }, 200);
    }

    updateElectricalHeader() {
        const headerTitle = document.getElementById('headerTitle');
        const headerSubtitle = document.getElementById('headerSubtitle');
        
        const electricalTitles = {
            local: { 
                title: 'Thiruporur EB Office', 
                subtitle: 'Assistant Engineer - TANGEDCO'
            },
            department: { 
                title: 'TANGEDCO Chennai EDC', 
                subtitle: 'Superintending Engineer - Distribution Circle'
            },
            central: { 
                title: 'Chennai Corporation', 
                subtitle: 'Electrical Infrastructure Coordination'
            }
        };
        
        const config = electricalTitles[this.currentRole];
        if (headerTitle) headerTitle.textContent = config.title;
        if (headerSubtitle) headerSubtitle.textContent = config.subtitle;
    }

    navigateToPage(pageId) {
        console.log(`Navigating to page: ${pageId}`);
        
        // Hide all pages in current view
        const currentView = document.querySelector(`.view.active`);
        if (currentView) {
            currentView.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            const targetPage = currentView.querySelector(`#${pageId}`);
            if (targetPage) {
                targetPage.classList.add('active');
            }
        }
        
        // Update navigation active state
        const currentNav = document.querySelector('.nav-items.active');
        if (currentNav) {
            currentNav.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const targetNavItem = currentNav.querySelector(`[data-page="${pageId}"]`);
            if (targetNavItem) {
                targetNavItem.classList.add('active');
            }
        }
        
        // Update current page for this role
        this.currentPage[this.currentRole] = pageId;
        
        // Setup page-specific electrical features
        this.setupElectricalPageFeatures(pageId);
    }

    setupElectricalPageFeatures(pageId) {
        switch (pageId) {
            case 'localComplaints':
                this.fetchAllDataFromAPI();
                this.renderElectricalComplaints();
                break;
            case 'localFieldWork':
                this.fetchAllDataFromAPI();
                this.updateFieldWorkData();
                break;
            case 'deptAnalytics':
            case 'deptPerformance':
            case 'centralOverview':
                setTimeout(() => this.setupElectricalCharts(), 100);
                break;
            case 'deptLive':
                this.setupElectricalLiveUpdates();
                break;
            case 'localCommunication':
                this.updateWhatsAppStats();
                break;
            case 'localProfile':
                this.updateEngineerProfile();
                break;
        }
    }

    switchTab(button) {
        const tabName = button.dataset.tab;
        const parent = button.closest('.page');
        
        if (!parent || !tabName) return;
        
        // Update tab buttons
        parent.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Update tab content
        parent.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = parent.querySelector(`#${tabName}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    renderElectricalComplaints(branchId="68d3b2f46b618379b9d88bed") {

        console.log
        const tbody = document.getElementById('complaintsTableBody');
        if (!tbody) return;

        tbody.innerHTML = ''; 

        this.data.complaints
        .filter(complaint => (complaint.branch) === branchId)
        .forEach(complaint => {
            const row = this.createElectricalComplaintRow   (complaint);
            tbody.appendChild(row);
        });
    }

    createElectricalComplaintRow(complaint) {
        const row = document.createElement('tr');
        row.className = `complaint-row electrical priority-${complaint.priority.toLowerCase()}`;
        row.dataset.complaintId = complaint.id;      

        const timeAgo = this.getTimeAgo(complaint.createdDate);
        const statusClass = this.getElectricalStatusClass(complaint.status);

        row.innerHTML = `
            <td class="complaint-id">${complaint.complaintId}</td>
            <td class="complaint-issue">
                <strong>${complaint.title}</strong>
                <br><small>${complaint.description}</small>
            </td>
            <td>
                <i class="fas fa-map-marker-alt"></i> ${complaint.location}
                <br><small>${timeAgo}</small>
            </td>
            <td><span class="category-tag ${complaint.category.toLowerCase()}">${complaint.category}</span></td>
            <td><span class="priority-badge ${complaint.priority.toLowerCase()}">${complaint.priority}</span></td>
            <td><span class="status ${statusClass}">${complaint.status}</span></td>
            <td>
                <button class="btn btn--sm btn--primary">Assign</button>
                <button class="btn btn--sm btn--outline">View</button>
            </td>
        `;

        return row;
    }


    createElectricalComplaintActions(complaint) {
        return `
            <div class="complaint-actions" style="margin-top: 12px; display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn--sm btn--primary" data-action="view" data-complaint="${complaint.id}">View Details</button>
                <button class="btn btn--sm btn--outline" data-action="update" data-complaint="${complaint.id}">Update Status</button>
                ${complaint.priority === 'Emergency' ? '<button class="btn btn--sm btn--emergency" data-action="emergency" data-complaint="' + complaint.id + '">Emergency Response</button>' : ''}
            </div>
        `;
    }

    getElectricalStatusClass(status) {
        const statusMap = {
            'Open': 'status--warning',
            'Verified': 'status--info',
            'Work Order Issued': 'status--info',
            'In Progress': 'status--warning',
            'Testing': 'status--info',
            'Resolved': 'status--success',
            'Closed': 'status--success',
            'Inspection Scheduled': 'status--info'
        };
        return statusMap[status] || 'status--info';
    }

    setupElectricalCharts() {
        if (typeof Chart === 'undefined') {
            console.log('Chart.js not loaded yet, retrying...');
            setTimeout(() => this.setupElectricalCharts(), 500);
            return;
        }

        // Department Analytics Chart - Electrical Performance
        const deptChartCanvas = document.getElementById('deptChart');
        if (deptChartCanvas && this.currentRole === 'department') {
            if (this.charts.deptChart) {
                this.charts.deptChart.destroy();
            }
            
            const ctx = deptChartCanvas.getContext('2d');
            this.charts.deptChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    datasets: [{
                        label: 'Electrical Complaints',
                        data: [78, 65, 89, 92, 76, 88, 95, 82, 86],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Resolved',
                        data: [72, 61, 84, 87, 71, 83, 89, 78, 81],
                        borderColor: '#B4413C',
                        backgroundColor: 'rgba(180, 65, 60, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Emergency Response',
                        data: [5, 8, 3, 6, 9, 4, 7, 5, 3],
                        borderColor: '#D2BA4C',
                        backgroundColor: 'rgba(210, 186, 76, 0.1)',
                        tension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'TANGEDCO Electrical Complaint Trends'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Complaints'
                            }
                        }
                    }
                }
            });
        }

        // Performance Chart - Electrical KPIs
        const performanceChartCanvas = document.getElementById('performanceChart');
        if (performanceChartCanvas && this.currentRole === 'department') {
            if (this.charts.performanceChart) {
                this.charts.performanceChart.destroy();
            }
            
            const ctx = performanceChartCanvas.getContext('2d');
            this.charts.performanceChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Power Quality', 'Response Time', 'Customer Satisfaction', 'Infrastructure Health', 'Safety Compliance', 'Energy Efficiency'],
                    datasets: [{
                        label: 'Current Performance',
                        data: [87.5, 92, 91, 89, 95, 88],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.2)',
                        borderWidth: 2
                    }, {
                        label: 'Target',
                        data: [90, 95, 92, 92, 98, 90],
                        borderColor: '#B4413C',
                        backgroundColor: 'rgba(180, 65, 60, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Electrical Service Performance Metrics'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 20
                            }
                        }
                    }
                }
            });
        }

        // Overview Chart for Central Authority - Electrical Infrastructure
        const overviewChartCanvas = document.getElementById('overviewChart');
        if (overviewChartCanvas && this.currentRole === 'central') {
            if (this.charts.overviewChart) {
                this.charts.overviewChart.destroy();
            }
            
            const ctx = overviewChartCanvas.getContext('2d');
            this.charts.overviewChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Street Lighting', 'Power Supply', 'Transformers', 'Meters', 'Service Connections', 'Safety Issues'],
                    datasets: [{
                        data: [245, 456, 89, 123, 67, 15],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Electrical Complaint Distribution by Category'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    filterElectricalComplaints(searchTerm) {
        const cards = document.querySelectorAll('.complaint-card');
        cards.forEach(card => {
            const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const location = card.querySelector('.complaint-meta span')?.textContent.toLowerCase() || '';
            const complaintId = card.querySelector('.complaint-id')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(searchTerm.toLowerCase()) ||
                            description.includes(searchTerm.toLowerCase()) ||
                            location.includes(searchTerm.toLowerCase()) ||
                            complaintId.includes(searchTerm.toLowerCase());
            
            card.style.display = matches ? 'block' : 'none';
        });
    }

    applyElectricalFilters() {
        const categoryFilter = document.getElementById('categoryFilter')?.value;
        const statusFilter = document.getElementById('statusFilter')?.value;
        
        const cards = document.querySelectorAll('.complaint-card');
        cards.forEach(card => {
            const complaintId = card.dataset.complaintId;
            const complaint = this.data.complaints.find(c => c.id === complaintId);
            
            if (!complaint) return;
            
            let show = true;
            
            // Category filter mapping
            if (categoryFilter) {
                const categoryMap = {
                    'street-light': 'Street Light',
                    'power-supply': 'Power Supply',
                    'transformer': 'Transformer',
                    'meter': 'Meter',
                    'cable': 'Cable',
                    'service': 'Service'
                };
                
                if (!complaint.category.toLowerCase().includes(categoryMap[categoryFilter]?.toLowerCase() || categoryFilter)) {
                    show = false;
                }
            }
            
            if (statusFilter && complaint.status.toLowerCase().replace(' ', '-') !== statusFilter) {
                show = false;
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }

    updateFieldWorkData() {
        // Update field work statistics with real data
        const fieldStats = document.querySelectorAll('.field-number');
        if (fieldStats.length >= 3) {
            fieldStats[0].textContent = this.getTodaysActiveWorkOrders();
            fieldStats[1].textContent = this.getEmergencyCalls();
            fieldStats[2].textContent = this.getScheduledWork();
        }
    }

    getTodaysActiveWorkOrders() {
        return this.data.complaints.filter(c => 
            c.workOrderNumber && 
            (c.status === 'In Progress' || c.status === 'Work Order Issued')
        ).length;
    }

    getEmergencyCalls() {
        return this.data.complaints.filter(c => c.priority === 'Emergency').length;
    }

    getScheduledWork() {
        // Mock calculation for scheduled work items
        return 15;
    }

    setupElectricalLiveUpdates() {
        // Clear existing interval
        if (this.liveUpdateInterval) {
            clearInterval(this.liveUpdateInterval);
        }

        // Setup live updates every 30 seconds
        this.liveUpdateInterval = setInterval(() => {
            if (this.currentPage[this.currentRole] === 'deptLive') {
                this.updateElectricalLiveStats();
                this.simulateNewElectricalComplaint();
            }
        }, 30000);
    }

    updateElectricalLiveStats() {
        const liveNumbers = document.querySelectorAll('.live-number');
        liveNumbers.forEach((number, index) => {
            const current = parseInt(number.textContent);
            let change;
            
            switch(index) {
                case 0: // New today
                    change = Math.floor(Math.random() * 2); // 0 or 1
                    break;
                case 1: // In progress
                    change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                    break;
                case 2: // Emergency
                    change = Math.random() > 0.8 ? 1 : 0; // Rarely increase
                    break;
                default:
                    change = 0;
            }
            
            const newValue = Math.max(0, current + change);
            number.textContent = newValue;
        });
    }

    simulateNewElectricalComplaint() {
        if (Math.random() > 0.7) { // 30% chance
            const liveComplaintsList = document.querySelector('.live-complaints-list');
            if (liveComplaintsList) {
                const newComplaint = this.createMockElectricalComplaint();
                liveComplaintsList.insertBefore(newComplaint, liveComplaintsList.firstChild);
                
                // Remove old complaints to keep list manageable
                const complaints = liveComplaintsList.querySelectorAll('.live-complaint');
                if (complaints.length > 5) {
                    liveComplaintsList.removeChild(liveComplaintsList.lastChild);
                }
            }
        }
    }

    createMockElectricalComplaint() {
        const complaints = [
            {
                title: "Street Light Failure - Anna Salai",
                description: "Multiple LED street lights not working near Central Railway Station",
                type: "Street Lighting",
                icon: "fas fa-lightbulb",
                details: "12 lights affected"
            },
            {
                title: "Power Cut - Guindy Area",
                description: "Transformer tripped due to overload during peak hours",
                type: "Power Supply",
                icon: "fas fa-bolt",
                details: "200+ consumers affected"
            },
            {
                title: "Cable Damage - IT Corridor",
                description: "Underground cable damaged during metro construction work",
                type: "Infrastructure",
                icon: "fas fa-exclamation-triangle",
                details: "Safety hazard reported"
            }
        ];
        
        const complaint = complaints[Math.floor(Math.random() * complaints.length)];
        const complaintDiv = document.createElement('div');
        complaintDiv.className = 'live-complaint new electrical';
        
        complaintDiv.innerHTML = `
            <div class="complaint-time">Just now</div>
            <h4>${complaint.title}</h4>
            <p>${complaint.description}</p>
            <div class="electrical-details">
                <span><i class="${complaint.icon}"></i> ${complaint.type}</span>
                <span><i class="fas fa-info-circle"></i> ${complaint.details}</span>
            </div>
            <div class="complaint-actions">
                <button class="btn btn--sm btn--primary">Assign Engineer</button>
                <button class="btn btn--sm btn--outline">View Details</button>
            </div>
        `;
        
        return complaintDiv;
    }

    updateWhatsAppStats() {
        const whatsappNumbers = document.querySelectorAll('.whatsapp-number');
        if (whatsappNumbers.length >= 2) {
            // Simulate daily WhatsApp activity
            whatsappNumbers[0].textContent = Math.floor(Math.random() * 50) + 100; // Messages
            whatsappNumbers[1].textContent = Math.floor(Math.random() * 20) + 30;  // Photo complaints
        }
    }

    updateEngineerProfile() {
        // Update engineer profile with current data
        const staffMember = this.data.staff.find(s => s.department === "Thiruporur EB Office" && s.designation.includes("Assistant Engineer"));
        if (staffMember) {
            console.log(`Engineer profile updated for: ${staffMember.name}`);
        }
    }

    handleElectricalButtonClick(button, event) {
        event.preventDefault();
        
        const action = button.dataset.action;
        const complaintId = button.dataset.complaint;
        const buttonText = button.textContent.trim();
        
        console.log(`Electrical button clicked: ${buttonText}, action: ${action}, complaint: ${complaintId}`);
        
        // Handle electrical-specific button actions
        if (action === 'view' && complaintId) {
            this.showElectricalComplaintDetails(complaintId);
        } else if (action === 'update' && complaintId) {
            this.updateElectricalComplaintStatus(complaintId);
        } else if (action === 'emergency' && complaintId) {
            this.initiateEmergencyResponse(complaintId);
        } else if (buttonText.includes('Create Work Order')) {
            this.showCreateWorkOrderDialog();
        } else if (buttonText.includes('Update Status')) {
            this.showUpdateStatusDialog(button);
        } else if (buttonText.includes('Start Work')) {
            this.startWorkOrder(button);
        } else if (buttonText.includes('Assign Engineer')) {
            this.showAssignEngineerDialog();
        } else if (buttonText.includes('Send Update')) {
            this.sendCustomerUpdate();
        } else if (buttonText.includes('Send Report')) {
            this.sendUrgentReport();
        } else if (buttonText.includes('View Photos')) {
            this.showWorkOrderPhotos();
        } else if (buttonText.includes('Emergency Response')) {
            this.showEmergencyResponseDialog();
        } else {
            // Generic button handling
            this.handleGenericButtonClick(buttonText);
        }
    }

    showElectricalComplaintDetails(complaintId) {
        const complaint = this.data.complaints.find(c => c.id === complaintId);
        if (complaint) {
            let details = `
🔌 ELECTRICAL COMPLAINT DETAILS

ID: ${complaint.id}
Title: ${complaint.title}
Location: ${complaint.location}
${complaint.landmark ? `Landmark: ${complaint.landmark}` : ''}
Status: ${complaint.status}
Priority: ${complaint.priority}
Category: ${complaint.category}
Reporter: ${complaint.reportedBy}
Phone: ${complaint.reporterPhone}

ELECTRICAL DETAILS:`;
            
            if (complaint.transformerNumber) {
                details += `\n🔌 Transformer: ${complaint.transformerNumber}`;
            }
            if (complaint.poleNumber) {
                details += `\n💡 Pole Number: ${complaint.poleNumber}`;
            }
            if (complaint.meterNumber) {
                details += `\n📊 Meter Number: ${complaint.meterNumber}`;
            }
            if (complaint.consumerNumber) {
                details += `\n👤 Consumer Number: ${complaint.consumerNumber}`;
            }
            if (complaint.affectedConsumers) {
                details += `\n👥 Affected Consumers: ${complaint.affectedConsumers}`;
            }
            if (complaint.workOrderNumber) {
                details += `\n📝 Work Order: ${complaint.workOrderNumber}`;
            }
            if (complaint.estimatedCost) {
                details += `\n💰 Estimated Cost: ₹${complaint.estimatedCost}`;
            }
            
            details += `\n\nDescription: ${complaint.description}`;
            
            if (complaint.assignedTo) {
                details += `\n\nAssigned To: ${complaint.assignedTo}`;
            }
            
            alert(details);
        }
    }

    showWorkOrderDetails(workOrderId) {
        const complaint = this.data.complaints.find(c => c.workOrderNumber === workOrderId);
        if (complaint) {
            const details = `
📋 WORK ORDER DETAILS

Work Order: ${workOrderId}
Complaint ID: ${complaint.id}
Type: ${complaint.category} - ${complaint.subCategory}
Location: ${complaint.location}
Priority: ${complaint.priority}
Status: ${complaint.status}
Assigned Engineer: ${complaint.assignedTo}
Estimated Cost: ₹${complaint.estimatedCost || 'TBD'}

Description: ${complaint.description}
            `;
            alert(details);
        }
    }

    updateElectricalComplaintStatus(complaintId) {
        const electricalStatuses = ['Open', 'Verified', 'Work Order Issued', 'In Progress', 'Testing', 'Resolved', 'Closed'];
        const currentComplaint = this.data.complaints.find(c => c.id === complaintId);
        
        if (!currentComplaint) return;
        
        const currentIndex = electricalStatuses.indexOf(currentComplaint.status);
        const nextStatus = electricalStatuses[Math.min(currentIndex + 1, electricalStatuses.length - 1)];
        
        currentComplaint.status = nextStatus;
        
        // Update the UI
        this.renderElectricalComplaints();
        
        alert(`⚡ Electrical complaint ${complaintId} status updated to: ${nextStatus}`);
    }

    initiateEmergencyResponse(complaintId) {
        const complaint = this.data.complaints.find(c => c.id === complaintId);
        if (complaint) {
            const response = `
🚨 EMERGENCY RESPONSE INITIATED

Complaint: ${complaint.id}
Type: ${complaint.category}
Location: ${complaint.location}

Actions Taken:
✅ Emergency team notified
✅ FOC Center (1912) alerted
✅ Field engineer dispatched
✅ Safety protocols activated
✅ Estimated response time: 30 minutes

Emergency Contact: 9445850811
            `;
            alert(response);
        }
    }

    showCreateWorkOrderDialog() {
        const workOrderDetails = prompt(`
📋 CREATE NEW WORK ORDER

Enter work order details:
1. Complaint ID
2. Priority (Emergency/High/Medium/Low)
3. Estimated completion hours
4. Required materials

Format: TNE2025XXX,High,4,LED Bulbs
        `);
        
        if (workOrderDetails && workOrderDetails.trim()) {
            const [id, priority, hours, materials] = workOrderDetails.split(',');
            alert(`✅ Work order created successfully!\n\nComplaint: ${id}\nPriority: ${priority}\nEstimated time: ${hours} hours\nMaterials: ${materials}`);
        }
    }

    showUpdateStatusDialog(button) {
        const workOrderCard = button.closest('.work-order-card');
        const workOrderId = workOrderCard?.querySelector('.work-order-id')?.textContent;
        
        const newStatus = prompt(`
📊 UPDATE WORK ORDER STATUS

Current Work Order: ${workOrderId}

Select new status:
1. Started
2. In Progress - 25%
3. In Progress - 50%
4. In Progress - 75%
5. Testing
6. Completed
7. Closed

Enter number (1-7):
        `);
        
        if (newStatus && newStatus.trim()) {
            const statuses = ['', 'Started', 'In Progress - 25%', 'In Progress - 50%', 'In Progress - 75%', 'Testing', 'Completed', 'Closed'];
            const selectedStatus = statuses[parseInt(newStatus)] || 'In Progress';
            alert(`✅ Work order ${workOrderId} status updated to: ${selectedStatus}`);
        }
    }

    startWorkOrder(button) {
        const workOrderCard = button.closest('.work-order-card');
        const workOrderId = workOrderCard?.querySelector('.work-order-id')?.textContent;
        const title = workOrderCard?.querySelector('h4')?.textContent;
        
        alert(`🔧 Work order ${workOrderId} started!\n\nTask: ${title}\n\n✅ Field engineer notified\n✅ Materials allocated\n✅ Safety checklist completed\n✅ Estimated completion: 4 hours`);
        
        // Update button text
        button.textContent = 'In Progress';
        button.classList.remove('btn--primary');
        button.classList.add('btn--outline');
    }

    showAssignEngineerDialog() {
        const engineers = [
            "AE Subramanian (Street Lighting)",
            "AE Ramesh Kumar (Transformers)",
            "JE Priya (Meters & Billing)",
            "Emergency Response Team"
        ];
        
        const engineerList = engineers.map((eng, idx) => `${idx + 1}. ${eng}`).join('\n');
        
        const selection = prompt(`
👷 ASSIGN ENGINEER

Available engineers:
${engineerList}

Enter number (1-4):
        `);
        
        if (selection && selection.trim()) {
            const selectedEngineer = engineers[parseInt(selection) - 1];
            if (selectedEngineer) {
                alert(`✅ Complaint assigned to: ${selectedEngineer}\n\n📱 SMS notification sent\n📧 Email notification sent\n🔔 Mobile app alert sent`);
            }
        }
    }

    sendCustomerUpdate() {
        const updateText = prompt(`
📱 SEND CUSTOMER UPDATE

Enter update message:
(Will be sent via SMS and WhatsApp to affected consumers)
        `);
        
        if (updateText && updateText.trim()) {
            alert(`✅ Update sent successfully!\n\nMessage: "${updateText}"\n\n📱 SMS sent to registered numbers\n💬 WhatsApp update sent to 9445850829\n📧 Email notification sent`);
        }
    }

    sendUrgentReport() {
        alert(`📊 URGENT REPORT SENT TO SE

Report sent to: Dr. S. Muralidharan (SE Chennai EDC)

Contents:
• Current transformer overload situation
• Affected consumer count
• Emergency response actions taken
• Resource requirements
• Estimated resolution time

✅ Report delivered via:
📱 SMS to SE mobile
📧 Email with technical details
💬 WhatsApp with photos`);
    }

    showWorkOrderPhotos() {
        alert(`📸 WORK ORDER PHOTOS

Available photos:
• Transformer load testing results
• Temperature readings
• Safety clearance documentation
• Equipment condition assessment

🔗 Photos uploaded to TANGEDCO portal
📊 Technical data recorded in system
✅ Compliance documentation complete`);
    }

    showEmergencyResponseDialog() {
        alert(`🚨 EMERGENCY RESPONSE PROTOCOL

Immediate Actions:
✅ FOC Center (1912) notified
✅ Emergency repair team dispatched  
✅ Safety perimeter established
✅ Power isolation completed
✅ Traffic management coordinated

Response Team:
👷 Lead Engineer: AE Ramesh Kumar
🚑 Safety Officer: On standby
🚔 Police coordination: Active
📡 Control room: Monitoring

ETA: 15 minutes`);
    }

    handleGenericButtonClick(buttonText) {
        const responses = {
            'View All': () => this.navigateToPage('localComplaints'),
            'New Message': () => alert('📝 New message interface would open here'),
            'Reply': () => this.showReplyInterface(),
            'Download': () => alert('📄 Electrical report download initiated'),
            'Generate Report': () => alert('📊 Custom electrical report generation started'),
            'Coordinate': () => alert('🤝 Inter-department coordination initiated'),
            'Plan Meeting': () => alert('📅 Planning meeting scheduled'),
            'View Project': () => alert('🏗️ Infrastructure project details would open'),
            'Manage Users': () => alert('👥 TANGEDCO user management interface would open'),
            'Generate Electrical Report': () => alert('⚡ Custom electrical report generation started')
        };
        
        const handler = Object.keys(responses).find(key => buttonText.includes(key));
        if (handler) {
            responses[handler]();
        } else {
            console.log(`Unhandled button: ${buttonText}`);
        }
    }

    showReplyInterface() {
        const reply = prompt('📝 Enter your reply:');
        if (reply && reply.trim()) {
            alert('✅ Reply sent successfully via internal TANGEDCO communication system');
        }
    }

    showEmergencyPanel() {
        const emergency = `
🚨 ELECTRICAL EMERGENCY PANEL

Emergency Numbers:
• FOC (Fuse Off Call): 1912
• Emergency Repair: 9445850811
• Thiruporur Office: 044-2434-1101
• WhatsApp Reports: 9445850829
• SE Chennai EDC: +91 9445857001

Quick Actions:
1. Report power outage
2. Report electrical hazard
3. Request emergency repair
4. Safety incident alert

Current Emergency Status:
⚠️ 2 active emergency calls
🔧 3 emergency teams available
⚡ All critical infrastructure operational
        `;
        
        alert(emergency);
    }

    showEmergencyContacts() {
        const contacts = `
🚨 EMERGENCY CONTACTS

FOC (Fuse Off Call): 1912
Emergency Repair: 9445850811
Thiruporur EB Office: 044-2434-1101
WhatsApp Chennai: 9445850829
Consumer Support: 9498794987

⚡ For immediate electrical emergencies, call 1912
📱 Send photos via WhatsApp: 9445850829
        `;
        alert(contacts);
    }

    showElectricalNotifications() {
        const notifications = `
🔔 ELECTRICAL NOTIFICATIONS

• New transformer overload alert - Kelambakkam
• Street light repair completed - Kalavakkam  
• Power quality issue reported - Usman Road
• Work order WO/TNE/2025/0046 in progress
• Monthly safety inspection due
• LED upgrade project approved

🚨 2 Emergency alerts
⚠️ 1 High priority complaint
        `;
        alert(notifications);
    }

    showOfficeDetails(officeName) {
        const officeData = {
            'Thiruporur EB Office': {
                performance: '91%',
                pending: '22',
                staff: '12',
                coverage: 'Kalavakkam, Kelambakkam, Usman Road'
            },
            'Kelambakkam EB Office': {
                performance: '88%',
                pending: '28',
                staff: '10',
                coverage: 'Kelambakkam, Mandaveli, Luz'
            },
            'Adyar EB Office': {
                performance: '85%',
                pending: '35',
                staff: '14',
                coverage: 'Adyar, BesanThiruporur, Thiruvanmiyur'
            }
        };
        
        const data = officeData[officeName];
        if (data) {
            alert(`⚡ ${officeName} Details\n\nPerformance: ${data.performance}\nPending Complaints: ${data.pending}\nStaff Count: ${data.staff}\nCoverage Area: ${data.coverage}`);
        }
    }

    showInfrastructureDetails(infraType) {
        const infraData = {
            'Transformers': 'Thiruporur Area: 3 Active, 1 Overloaded (T-NG-15), 1 Maintenance Due (T-NG-08)',
            'Street Lights': '245 Total, 221 Functional, 24 Need Repair, 180 LED Upgraded',
            'Service Connections': '14,835 Active (12,450 Domestic, 2,340 Commercial, 45 Industrial)'
        };
        
        const info = infraData[infraType];
        if (info) {
            alert(`🏗️ ${infraType} Status\n\n${info}`);
        }
    }

    handleElectricalSetting(toggle) {
        const settingItem = toggle.closest('.setting-item');
        const setting = settingItem?.querySelector('span')?.textContent || 'Unknown setting';
        const enabled = toggle.checked;
        
        console.log(`Electrical setting "${setting}" ${enabled ? 'enabled' : 'disabled'}`);
        
        let message = `⚙️ Setting "${setting}" ${enabled ? 'enabled' : 'disabled'}`;
        
        // Add electrical-specific setting responses
        if (setting.includes('Emergency')) {
            message += '\n\n🚨 Emergency alerts will ' + (enabled ? 'be sent immediately' : 'be disabled');
        } else if (setting.includes('Transformer')) {
            message += '\n\n🔌 Transformer monitoring ' + (enabled ? 'activated' : 'deactivated');
        } else if (setting.includes('WhatsApp')) {
            message += '\n\n💬 WhatsApp integration ' + (enabled ? 'connected' : 'disconnected');
        }
        
        alert(message);
    }

    updateRoleSpecificData() {
        // Update data based on current role
        switch (this.currentRole) {
            case 'local':
                this.updateLocalOfficeData();
                this.updateDashboardStats();
                break;
            case 'department':
                this.updateDepartmentData();
                break;
            case 'central':
                this.updateCentralData();
                break;
        }
    }

    // updateLocalOfficeData() {
    //     // Update Thiruporur EB Office specific data
    // }

    updateDepartmentData() {
        // Update Chennai EDC data
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length >= 4) {
            stats[0].textContent = this.data.performance.chennaiEDC.totalComplaints;
            stats[1].textContent = this.data.performance.chennaiEDC.resolved;
            stats[2].textContent = this.data.performance.chennaiEDC.pending;
            stats[3].textContent = this.data.performance.chennaiEDC.slaCompliance;
        }
    }

    updateCentralData() {
        // Update Chennai Corporation coordination data
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length >= 4) {
            stats[0].textContent = this.data.performance.chennaiEDC.officesUnderJurisdiction;
            stats[1].textContent = '89%';
            stats[2].textContent = this.data.performance.chennaiEDC.totalComplaints;
            stats[3].textContent = this.data.performance.tNagarOffice.customerSatisfaction;
        }
    }

    startRealTimeUpdates() {
        // Update notification badge periodically
        setInterval(() => {
            const change = Math.floor(Math.random() * 3) - 1;
            this.notifications = Math.max(0, this.notifications + change);
            const badge = document.getElementById('notificationBadge');
            if (badge) {
                badge.textContent = this.notifications;
            }
        }, 45000); // Update every 45 seconds for electrical system

        // Simulate emergency alerts
        setInterval(() => {
            if (Math.random() > 0.9 && this.currentRole === 'local') { // 10% chance
                this.showEmergencyAlert();
            }
        }, 120000); // Check every 2 minutes
    }

    showEmergencyAlert() {
        const emergencyTypes = [
            'Transformer overload detected - T-NG-15',
            'Cable spark reported - Safety hazard',
            'Power outage affecting 50+ consumers',
            'Meter explosion reported - Emergency response needed'
        ];
        
        const alert = emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)];
        
        // Show emergency notification
        const notification = document.createElement('div');
        notification.className = 'emergency-notification';
        notification.style.cssText = `
            position: fixed;
            top: 70px;
            right: 16px;
            background: #dc2626;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1001;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-exclamation-triangle" style="color: #fbbf24;"></i>
                <div>
                    <strong>Emergency Alert</strong><br>
                    <small>${alert}</small>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 10000);
    }

    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            return "Just now";
        } else if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays} days ago`;
        }
    }
}

// Initialize the TANGEDCO Electrical Complaint Management System
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing TANGEDCO system...');
    window.electricalApp = new ElectricalComplaintApp();
});

// Add keyboard navigation for electrical emergency
document.addEventListener('keydown', (e) => {
    // Quick navigation with number keys 1-5
    if (e.key >= '1' && e.key <= '5') {
        const navItems = document.querySelectorAll('.nav-items.active .nav-item');
        const index = parseInt(e.key) - 1;
        if (navItems[index]) {
            navItems[index].click();
        }
    }
    
    // F1 key for emergency panel
    if (e.key === 'F1') {
        e.preventDefault();
        if (window.electricalApp) {
            window.electricalApp.showEmergencyPanel();
        }
    }
    
    // ESC key to close overlays
    if (e.key === 'Escape') {
        const overlay = document.getElementById('modalOverlay');
        if (overlay && !overlay.classList.contains('hidden')) {
            overlay.classList.add('hidden');
        }
        
        // Also remove emergency notifications
        document.querySelectorAll('.emergency-notification').forEach(n => n.remove());
    }
});

// Performance monitoring for electrical system
const observeElectricalPageLoad = () => {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`TANGEDCO system load time: ${loadTime}ms`);
    }
};

window.addEventListener('load', observeElectricalPageLoad);

// Add CSS for emergency notifications
const emergencyStyles = document.createElement('style');
emergencyStyles.textContent = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.emergency-notification {
    animation: slideIn 0.3s ease-out;
}

.btn--emergency {
    background: #dc2626 !important;
    color: white !important;
    border: none !important;
    animation: pulse 2s infinite;
}
`;

document.head.appendChild(emergencyStyles);