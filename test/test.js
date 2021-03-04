const Infrachain = artifacts.require("Infrachain");

require ('chai')
	.use(require('chai-as-promised'))
	.should()
contract('Infrachain',(accounts)=>{
	let infra
	before(async()=>{
		infra=await Infrachain.deployed();
	})
//test deployement
	describe('deployment',async()=>{
		it('deploys successfully',async()=>{
		const address=infra.address
		assert.notEqual(address,'')
		assert.notEqual(address,null)
		assert.notEqual(address,undefined)
		console.log('address',address)	
		})
	})
	describe('storage',async()=>{
		it('add Doc',async()=>{
			let docHash='0xb84096A988FB94b4BF0Dc2738b3468351f900533'
			let emailOwner='badr@gmail.com'
			let name='badr el abbassi'
			let typeDocument='attestation'
			await infra.addDoc(docHash,emailOwner,name,typeDocument)
			//get doc
			const result=await infra.Docs(docHash)
			assert.equal(result.docHash,docHash)
			console.log('result',result)
		})
	})
})