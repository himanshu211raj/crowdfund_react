// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

// Imorting OpenZEpp;om's SafeMath Implementation
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol';

contract Crowdfund {
    using SafeMath for uint256;

    //List of existing projects 
    Project[] private projects;

    // Events that will be emitted whenever a project is started
    event ProjectStarted(
        address contractAddress,
        address payable projectStarter,
        string projectTitle,
        string projectDesc,
        uint256 deadline,
        uint256 goalAmount
    );

    function startProject(
        string calldata title,
        string calldata description,
        uint durationInDays,
        uint amountToRaise
    ) external {
        uint raiseUntil = block.timestamp.add(durationInDays.mul(1 days));
        Project newProject = new Project(payable(msg.sender), title, description, raiseUntil, amountToRaise);
        projects.push(newProject);
        emit ProjectStarted(
            address(newProject),
            payable(msg.sender),
            title,
            description,
            raiseUntil,
            amountToRaise
        );
    }

    function returnAllProjects() external view returns(Project[] memory) {
        return projects;
    }
}


// project contract
contract Project {
    using SafeMath for uint256;

    // data structures
    enum State {
        Fundraising,
        Expired,
        Successful
    }

    //state variables 
    address payable public creator;
    uint public amountGoal;  // required to reach at least this much, else everyone gets refund
    uint public completeAt;
    uint256 public currentBalance;
    uint public raiseBy;
    string public title;
    string public description;
    State public state = State.Fundraising; // initialize on create 
    mapping (address => uint) public contributions;

    // Event that will be emitted whenever funding will be received 
    event FundingReceived(address payable contributior, uint amount, uint currentTotal);
    // Event that will be emitted whenever the project starter has resceived the funds
    event CreatorPaid(address payable receipient);

    // Modifier to check current state
    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    // Modifier to check if the function caller is the project creator
    modifier isCreator() {
        require(msg.sender == creator);
        _;
    }

    constructor
    (
        address payable projectStarter,
        string memory projectTitle,
        string memory projectDesc,
        uint fundRaisingDeadline,
        uint goalAmount
    ) {
        creator = projectStarter;
        title = projectTitle;
        description = projectDesc;
        amountGoal = goalAmount;
        raiseBy = fundRaisingDeadline;
        currentBalance =0;
    }

    function contribute() external inState(State.Fundraising) payable {
        require(msg.sender != creator);
        contributions[msg.sender] = contributions[msg.sender].add(msg.value);
        currentBalance = currentBalance.add(msg.value);
        emit FundingReceived(payable(msg.sender), msg.value, currentBalance);
        checkIfFundingCompleteOrExpired();
    }

    function checkIfFundingCompleteOrExpired() public {
        if (currentBalance >= amountGoal) {
            state = State.Successful;
            payout();
        } else if(block.timestamp > raiseBy) {
            state = State.Expired;
        }
        completeAt = block.timestamp;
    }

    function payout() internal inState(State.Successful) returns (bool) {
        uint256 totalRaised = currentBalance;
        currentBalance = 0;

        if (creator.send(totalRaised)) {
            emit CreatorPaid(creator);
            return true;
        } else {
            currentBalance = totalRaised;
            state = State.Successful;
        }
        return false;
    }

    function getRefund() public inState(State.Expired) returns (bool) {
        require(contributions[msg.sender] > 0);

        uint amountToRefund = contributions[msg.sender];
        contributions[msg.sender] = 0;

        if (!payable(msg.sender).send(amountToRefund)) {
            contributions[msg.sender] = amountToRefund;
            return false;
        } else {
            currentBalance = currentBalance.sub(amountToRefund);
        }

        return true;
    }

    function getDetails() public view returns 
    (
        address payable projectStarter,
        string memory projectTitle,
        string memory projectDesc,
        uint256 deadline,
        State currentState,
        uint256 currentAmount,
        uint256 goalAmount
    ) {
        projectStarter = creator;
        projectTitle = title;
        projectDesc = description;
        deadline = raiseBy;
        currentState = state;
        currentAmount = currentBalance;
        goalAmount = amountGoal;
    }

}

