pragma solidity >=0.5.1 <0.8.0;
contract Infrachain{
    uint256 public docCount=0;
     mapping(string => Document) public Docs;
     struct Document{
         string docHash;
         string  emailOwner;
         string  name;
         string  dateCreation;
         string certifiedBy;
     }
     function addDoc
        (string memory docHash,
            string memory emailOwner,
            string memory name,
            string memory dateCreation,
            string memory certifiedBy
            )public{
         docCount+=1;
         Docs[docHash]=Document(docHash,emailOwner,name,dateCreation,certifiedBy);
         
     }
    function get() public view returns (uint256) {
        return docCount;
    }
     
}